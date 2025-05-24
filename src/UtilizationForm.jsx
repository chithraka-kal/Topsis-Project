import React, { useState } from 'react';

const UtilizationForm = ({ goToTab }) => {
  const alternatives = [
    { code: 'A9', name: 'Products providing permanent storage' },
    { code: 'A10', name: 'Products potentially providing long-term storage' },
    { code: 'A11', name: 'Intermediates for products' },
    { code: 'A12', name: 'Short-term CO2 use in conventional production' },
    { code: 'A13', name: 'Short-term CO2 use in non-conventional processes' },
    { code: 'A14', name: 'Utilization of CO2 for renewable fuel' }
  ];

  const criteria = [
    { id: 'C1', label: 'Specific mass of CO2 in product' },
    { id: 'C2', label: 'CO2 utilization potential (CUP)' },
    { id: 'C3', label: 'Technology Maturity' },
    { id: 'C4', label: 'Health, Safety, Environment (HSE)' },
    { id: 'C5', label: 'Resource use' },
    { id: 'C6', label: 'CO2 quality requirements' },
    { id: 'C7', label: 'Economic Viability' }
  ];

  const [ratings, setRatings] = useState({});
  const [result, setResult] = useState(null);

  const handlePrevious = () => {
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
      <h2>Carbon Utilization</h2>
      <div>
        <h3>Products Providing Permanent Storage</h3>
        <p>These products chemically or physically bind CO₂ in a way that ensures its sequestration for geological or
          structural timescales. The captured CO₂ becomes part of stable mineral or composite materials, contributing
          directly to climate change mitigation.</p>
        <ul>
          <li>Construction aggregates made via mineral carbonation</li>
          <li>Carbonated concrete for infrastructure and buildings</li>
          <li>Carbon nanomaterials (CNMs) and graphene, used in electronics and structural composites</li>
        </ul>
        <p>
          Such applications are particularly relevant to Sri Lanka’s cement and construction sectors, offering synergy
          between CO₂ capture and green material development.
        </p>
        <img src='.\images\Utilization\permanentStorage.png' className='image' />

        <h3>Products Potentially Providing Long-Term Storage</h3>
        <p>These products incorporate CO₂ into molecular structures that are stable over extended periods, depending on
          usage and environmental exposure. They offer medium- to long-term carbon retention with commercial utility.</p>
        <ul>
          <li>Calcium carbonate, a filler and pigment in construction and paper</li>
          <li>Melamine-formaldehyde (MF) and urea-formaldehyde (UF) resins in wood-based panels</li>
          <li>Polycarbonate polyols, bisphenol-A polycarbonates, and polyoxymethylene, used in plastics and coatings</li>
        </ul>
        <p>These products strike a balance between durability and commercial integration, useful for evaluating lifecycle
          emissions.</p>
        <img src='.\images\Utilization\longTermStorage.png' className='image' />

        <h3>Intermediates for Products</h3>
        <p>These are chemical precursors synthesized from CO₂ that serve as feedstocks in the manufacture of various
          end-use products. Though they may not store CO₂ indefinitely, they integrate it into extended industrial chains.</p>
        <ul>
          <li>Urea, crucial in agriculture and resins</li>
          <li>Methanol and formaldehyde, key platform chemicals</li>
          <li>Melamine, formic acid, and dimethyl carbonate, used in plastics and solvents</li>
        </ul>
        <p>Utilizing CO₂ as a raw material in chemical synthesis is a cornerstone of carbon circularity.</p>
        <img src='.\images\Utilization\intermediates.png' className='image' />

        <h3>Products Providing Short-Term Storage and Utilizing CO₂ in the Conventional Production Process</h3>
        <p>These processes make use of CO₂ within existing industrial frameworks, where the captured carbon is eventually
          released, typically through use or degradation.</p>
        <ul>
          <li>Urea for fertilizers, rapidly metabolized in soil</li>
          <li>CO₂ for food and beverage carbonation, released during consumption</li>
          <li>CO₂ for greenhouse enrichment, enhancing crop yield</li>
          <li>Aliphatic polycarbonates with moderate durability in packaging and coatings</li>
        </ul>
        <p>This category supports economically feasible, immediately scalable CO₂ use, albeit with limited
          climate impact duration.</p>
        <img src='.\images\Utilization\utilizingCO2.png' className='image' width={500} />

        <h3>Products Providing Short-Term Storage and Utilizing CO₂ in Non-Conventional Processes</h3>
        <p>These are emerging, innovative applications that utilize CO₂ in novel chemical or material processes.
          While storage is often temporary, these pathways expand the versatility of carbon capture technologies.</p>
        <ul>
          <li>Isopropanol, oxalic acid, and cellulose carbamates, with roles in pharmaceuticals and bio-composites</li>
          <li>Dimethyl carbonate, formic acid, formaldehyde, and cyclic carbonates, explored for use in batteries,
            solvents, and biodegradable polymers</li>
        </ul>
        <p>This category highlights the R&D frontier, with potential for high-value applications.</p>
        <img src='.\images\Utilization\img.png' className='image' />

        <h3>Utilization of CO₂ for Renewable Fuel Production</h3>
        <p>This pathway converts CO₂ into energy carriers, closing the carbon loop and facilitating integration with
          renewable energy systems. Although CO₂ is released upon combustion, these fuels offset fossil inputs and can be
          part of net-zero strategies.</p>
        <ul>
          <li>Methane and hydrocarbons through catalytic or biological conversion</li>
          <li>Dimethyl ether, ethanol, methanol, and formic acid as synthetic fuels</li>
          <li>Biodiesel from fatty acids, enhancing biomass carbon efficiency</li>
        </ul>
        <p>Such uses are crucial in decarbonizing transport and supporting energy resilience in regions like Sri Lanka.</p>
        <img src='.\images\Utilization\renewableFuelProduction.png' className='image' width={400} />
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
          </div>
        </div>
      )}
    </div>
  );
};

export default UtilizationForm;
