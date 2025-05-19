import React, { useState } from 'react';
import './TopsisForm.css';

const TopsisRatingForm = () => {
  const criteria7 = ['C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7'];
  const criteria6 = ['C1', 'C2', 'C3', 'C4', 'C5', 'C6'];

  const sections = [
    {
      title: 'Carbon Capture',
      alts: ['A1', 'A2', 'A3', 'A4'],
      criteria: criteria7,
    },
    {
      title: 'Carbon Separation',
      alts: ['A5', 'A6', 'A7', 'A8'],
      criteria: criteria6,
    },
    {
      title: 'Carbon Utilization',
      alts: ['A9', 'A10', 'A11', 'A12', 'A13', 'A14'],
      criteria: criteria7,
    }
  ];

  const [ratings, setRatings] = useState({});
  const [results, setResults] = useState({});

  const handleChange = (alt, crit, value) => {
    setRatings(prev => ({
      ...prev,
      [`${alt}${crit}`]: value,
    }));
  };

  const handleSubmit = async (sectionKey, alts, criteria) => {
    const matrix = alts.map(alt =>
      criteria.map(crit => parseFloat(ratings[`${alt}${crit}`] || 0))
    );

    const weights = Array(criteria.length).fill(1);
    const impacts = Array(criteria.length).fill('+');

    try {
      const response = await fetch('https://sachin84.pythonanywhere.com/topsis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ratings: matrix, weights, impacts })
      });

      const data = await response.json();
      setResults(prev => ({
        ...prev,
        [sectionKey]: data
      }));
    } catch (error) {
      console.error('Error:', error);
      alert('Error communicating with the backend.');
    }
  };

  const renderSection = (section, index) => {
    const { title, alts, criteria } = section;
    const sectionKey = `section${index}`;

    const result = results[sectionKey];

    return (
      <div key={sectionKey} className="alt-section">
        <h3>{title}</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(sectionKey, alts, criteria);
          }}
        >
          <table className="ratings-table">
            <thead>
              <tr>
                <th>Alternative</th>
                {criteria.map(crit => <th key={crit}>{crit}</th>)}
              </tr>
            </thead>
            <tbody>
              {alts.map((alt) => (
                <tr key={alt}>
                  <td><strong>{alt}</strong></td>
                  {criteria.map((crit) => (
                    <td key={`${alt}${crit}`}>
                      <input
                        type="number"
                        min="1"
                        max="5"
                        value={ratings[`${alt}${crit}`] || ''}
                        onChange={(e) => handleChange(alt, crit, e.target.value)}
                        required
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <button type="submit" className="submit-button">Submit {title}</button>
        </form>

        {result && (
          <div className="result-section">
            <h4>{title} – TOPSIS Results</h4>
            <table className="result-table">
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

  return (
    <div className="container">
      <h2>TOPSIS Rating Form</h2>
      <p>Please rate each alternative from 1 to 5 based on the criteria.</p>
      {sections.map((section, i) => renderSection(section, i))}
    </div>
  );
};

export default TopsisRatingForm;
