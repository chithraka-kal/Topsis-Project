import React, { useState } from 'react';

const CaptureForm = ({ goToTab }) => {
  const alternatives = [
    { code: 'A1', name: 'Pre Combustion' },
    { code: 'A2', name: 'Post Combustion' },
    { code: 'A3', name: 'Oxyfuel Combustion' },
    { code: 'A4', name: 'Industrial Separation' }
  ];

  const criteria = [
    { id: 'C1', label: 'CO2 emission efficiency' },
    { id: 'C2', label: 'Energy consumption' },
    { id: 'C3', label: 'Investment / capital cost' },
    { id: 'C4', label: 'Operation and maintenance cost' },
    { id: 'C5', label: 'Technology Maturity' },
    { id: 'C6', label: 'Flexibility of Application' },
    { id: 'C7', label: 'Environmental Impact' }
  ];

  const [ratings, setRatings] = useState({});
  const [result, setResult] = useState(null);

  const handleNext = () => {
    goToTab('separation');
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
      <h2>Carbon Capture</h2>
      <div>
        <h3>Pre-combustion capture</h3>
        <p>Pre-combustion capture involves the removal of carbon dioxide (CO₂) from fossil fuels before the combustion process takes
          place. In this method, fuel is first converted into a mixture of hydrogen and carbon monoxide through gasification.
          The carbon monoxide is then reacted with steam to produce CO₂ and more hydrogen. The CO₂ is separated and captured,
          while the hydrogen can be used as a clean fuel in power generation or industrial processes. Although commonly used in
          integrated gasification combined cycle (IGCC) plants, the application in cement manufacturing is still limited and typically
          more suitable for new-build facilities due to high infrastructure costs and process modifications.</p>
        <img src='src\images\Capture\preCombustionCapture.png' alt='Pre-combustion capture' className='image' />

        <h3>Post-Combustion Capture</h3>
        <p>Post-combustion capture focuses on removing CO₂ from the exhaust gases after the combustion of fossil fuels or raw materials
          has occurred. It is one of the most mature and commercially available technologies, typically using chemical solvents
          such as amines to absorb CO₂ from flue gas. Its compatibility with existing cement plant infrastructure makes it a viable
          retrofitting option for Sri Lanka's older cement production facilities. However, the energy penalty associated with solvent
          regeneration remains a significant challenge.</p>
        <img src='src\images\Capture\postCombustionCapture.png' alt='Post-combustion capture' className='image' />

        <h3>Oxy-Fuel Combustion Capture</h3>
        <p>Oxy-fuel combustion involves burning fuel in a mixture of pure oxygen and recycled flue gas instead of air.
          This results in a highly concentrated CO₂ stream, which simplifies the capture process. While it offers high capture
          efficiency and lower nitrogen oxide (NOₓ) emissions, the need for an air separation unit (ASU) and flue gas recirculation
          system makes it capital-intensive. This approach is more applicable to new cement plants or large-scale retrofitting projects
          and is still under development in pilot-scale studies globally.</p>
        <img src='src\images\Capture\oxyFuelCombustionCapture.png' alt='Oxy-Fuel combustion capture' className='image' />

        <h3>Industrial Separation</h3>
        <p>Industrial separation technologies refer to standalone processes that remove CO₂ from various industrial streams,
          independent of the combustion process. These techniques often use chemical solvents, physical sorbents, or membrane
          technologies to extract CO₂ from flue gas or other process emissions. This approach is particularly relevant for cement
          manufacturing, where CO₂ is emitted not only from fuel combustion but also from the calcination of limestone. Industrial
          separation offers a modular, potentially retrofittable solution for existing plants in Sri Lanka, especially where full
          process overhauls are impractical.</p>
        <img src='src\images\Capture\industrialSeparation.png' alt='Industrial separation' className='image' />
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
            <button class="only-next" onClick={handleNext}>Next</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CaptureForm;
