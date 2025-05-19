import React, { useState } from 'react';

const SeparationForm = () => {
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
        </div>
      )}
    </div>
  );
};

export default SeparationForm;
