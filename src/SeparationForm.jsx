import React, { useState } from 'react';

const SeparationForm = ({ goToTab }) => {
  const alternatives = [
    { code: 'A5', name: 'Solvents (Absorption)' },
    { code: 'A6', name: 'Membranes' },
    { code: 'A7', name: 'Solid Sorbents' },
    { code: 'A8', name: 'Cryogenic' }
  ];

  const criteria = [
    { id: 'C1', label: 'Sorption capacity' },
    { id: 'C2', label: 'Thermal stability' },
    { id: 'C3', label: 'Level of regeneration' },
    { id: 'C4', label: 'Influence of other factors' },
    { id: 'C5', label: 'Impact of moisture' },
    { id: 'C6', label: 'Material availability' }
  ];

  const [ratings, setRatings] = useState({});
  const [result, setResult] = useState(null);

  const handlePrevious = () => {
    goToTab('capture');
  };

  const handleNext = () => {
    goToTab('utilization');
  };

  const handleChange = (altCode, critId, value) => {
    setRatings(prev => ({
      ...prev,
      [`${altCode}${critId}`]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const matrix = alternatives.map(alt =>
      criteria.map(crit => parseFloat(ratings[`${alt.code}${crit.id}`] || 0))
    );

    const weights = Array(criteria.length).fill(1);
    const impacts = Array(criteria.length).fill('+');

    try {
      const response = await fetch('https://sachin84.pythonanywhere.com/topsis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ratings: matrix, weights, impacts })
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Error:', error);
      alert('Error communicating with the backend.');
    }
  };

  return (
    <div className="container">
      <h2>Carbon Separation</h2>
      <div>
        <h3>Solvents (Absorption)</h3>
        <p>Solvent-based absorption uses liquid chemicals—typically amines—to capture CO₂ from gas streams.
          The flue gas is passed through an absorber where the CO₂ binds with the solvent. The CO₂-rich solvent is then
          heated in a regenerator to release pure CO₂, allowing the solvent to be reused. This is the most commercially
          mature technology and is widely adopted due to its high capture efficiency. However, it has high energy demands
          and potential solvent degradation issues, which can impact long-term sustainability in cement production
          contexts.</p>
        <img src='.\images\Separation\solvents.png' alt='Solvents' className='image' />

        <h3>Membranes</h3>
        <p>Membrane separation relies on selectively permeable materials that allow CO₂ to pass through while blocking
          gases. These systems operate under pressure or concentration gradients and can be integrated into existing
          gas treatment setups with minimal space requirements. Membranes are compact, scalable, and energy-efficient
          but often face challenges in selectivity and durability, especially under the high-temperature, dusty
          conditions common in cement plants.</p>
        <img src='.\images\Separation\membranes.png' alt='Membranes' className='image' />

        <h3>Solid Sorbents</h3>
        <p>Solid sorbents capture CO₂ through physical or chemical binding on porous solid materials such as zeolites,
          activated carbon, or metal-organic frameworks (MOFs). These materials can be regenerated through pressure or
          temperature swings, making the process cyclic and potentially energy-efficient. Solid sorbents offer promising
          low-cost alternatives to solvents, especially in modular or small-scale applications, though their industrial
          deployment in cement manufacturing is still under research and development.</p>
        <img src='.\images\Separation\solidSorbents.png' alt='Solid Sorbents' className='image' width={400} />

        <h3>Cryogenic Separation</h3>
        <p>Cryogenic separation involves cooling gas mixtures to very low temperatures to liquefy or solidify
          CO₂ for removal. This technique yields high-purity CO₂ and is best suited for gas streams with high
          CO₂ concentrations. While it is less common in cement production due to high energy consumption, it
          holds potential in niche applications or when integrated with other technologies to improve overall
          system efficiency.</p>
        <img src='.\images\Separation\cryogenicSeparation.jpg' alt='Cryogenic Separation' className='image' />
      </div>

      <p className='topsis-description'>
        Use a scale of:
        <span> Very Good - 5</span> ,
        <span> Good - 4</span>,
        <span> Average - 3</span>,
        <span> Poor - 2</span>,
        <span> Very Poor-1</span>
      </p>
      <form onSubmit={handleSubmit}>
        <table className="ratings-table">
          <thead>
            <tr>
              <td></td>
              <td></td>
              {criteria.map(crit => (
                <td key={`head-${crit.id}`}><strong>{crit.id}</strong></td>
              ))}
            </tr>
            <tr>
              <td></td>
              <td><strong>Alternative</strong></td>
              {criteria.map(crit => (
                <td key={`label-${crit.id}`}>{crit.label}</td>
              ))}
            </tr>
          </thead>
          <tbody>
            {alternatives.map(alt => (
              <tr key={alt.code}>
                <td><strong>{alt.code}</strong></td>
                <td>{alt.name}</td>
                {criteria.map(crit => (
                  <td key={`${alt.code}${crit.id}`}>
                    <input
                      type="number"
                      min="1"
                      max="5"
                      value={ratings[`${alt.code}${crit.id}`] || ''}
                      onChange={(e) => handleChange(alt.code, crit.id, e.target.value)}
                      required
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        <button type="submit">Submit</button>
      </form>

      {result && (
        <div className="result">
          <h3>TOPSIS Results</h3>
          <table>
            <thead>
              <tr>
                <th>Alternative</th>
                <th>Score</th>
                <th>Ranking</th>
              </tr>
            </thead>
            <tbody>
              {result.alternatives.map((alt, index) => (
                <tr key={alt}>
                  <td>{alt}</td>
                  <td>{result.scores[index].toFixed(4)}</td>
                  <td>{result.rankings[index]}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div class="nav-buttons">
            <button onClick={handlePrevious}>Previous</button>
            <button onClick={handleNext}>Next</button>
          </div>

        </div>
      )}
    </div>
  );
};

export default SeparationForm;
