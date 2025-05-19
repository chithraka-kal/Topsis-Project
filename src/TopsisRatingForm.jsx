import React, { useState } from 'react';
import './TopsisForm.css';

const TopsisRatingForm = () => {
  const alternatives = ['A1', 'A2', 'A3', 'A4', 'A5'];
  const criteria = ['C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7'];

  const [ratings, setRatings] = useState({});
  const [result, setResult] = useState(null);

  const handleChange = (alt, crit, value) => {
    setRatings(prev => ({
      ...prev,
      [`${alt}${crit}`]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert ratings to 2D array
    const matrix = alternatives.map(alt =>
      criteria.map(crit => parseFloat(ratings[`${alt}${crit}`] || 0))
    );

    // Example static weights and impacts
    const weights = Array(criteria.length).fill(1);     // Equal weights
    const impacts = Array(criteria.length).fill('+');   // All beneficial

    try {
      const response = await fetch('https://sachin84.pythonanywhere.com/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ratings: matrix,
          weights: weights,
          impacts: impacts
        })
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
      <h2>TOPSIS Rating Form</h2>
      <form onSubmit={handleSubmit}>
        {alternatives.map((alt) => (
          <div key={alt} className="alternative-group">
            <h3>{alt}</h3>
            {criteria.map((crit) => (
              <div key={crit} className="criteria-input">
                <label htmlFor={`${alt}${crit}`}>{crit}:</label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  id={`${alt}${crit}`}
                  value={ratings[`${alt}${crit}`] || ''}
                  onChange={(e) => handleChange(alt, crit, e.target.value)}
                  required
                />
              </div>
            ))}
          </div>
        ))}
        <button type="submit">Submit Ratings</button>
      </form>

      {result && (
  <div className="result">
    <h3>TOPSIS Results:</h3>
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
            <td>{result.scores[index]}</td>
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

export default TopsisRatingForm;
