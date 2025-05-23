import React, { useState, useEffect  } from 'react';
import HomePage from './HomePage';
import CaptureForm from './CaptureForm';
import SeparationForm from './SeparationForm';
import UtilizationForm from './UtilizationForm';
import './TopsisForm.css';

const TopsisRatingForm = () => {
  const [activeTab, setActiveTab] = useState('home');

  const goToTab = (tabName) => setActiveTab(tabName);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage />;
      case 'capture':
        return <CaptureForm goToTab={goToTab} />;
      case 'separation':
        return <SeparationForm goToTab={goToTab}/>;
      case 'utilization':
        return <UtilizationForm goToTab={goToTab}/>;
      default:
        return null;
    }
  };

  return (
    <div className="topsis-container">
      <h2 className="topsis-title">CCUS TOPSIS Rating Tool</h2>

      <div className="topsis-description">
        <h4>Select a Carbon Management Strategy</h4>

      </div>

      <div className="topsis-tabs">
        <button
          className={`topsis-tab ${activeTab === 'home' ? 'active' : ''}`}
          onClick={() => setActiveTab('home')}
        >
          Home
        </button>

        <button
          className={`topsis-tab ${activeTab === 'capture' ? 'active' : ''}`}
          onClick={() => setActiveTab('capture')}
        >
          Carbon Capture
        </button>
        <button
          className={`topsis-tab ${activeTab === 'separation' ? 'active' : ''}`}
          onClick={() => setActiveTab('separation')}
        >
          Carbon Separation
        </button>
        <button
          className={`topsis-tab ${activeTab === 'utilization' ? 'active' : ''}`}
          onClick={() => setActiveTab('utilization')}
        >
          Carbon Utilization
        </button>
      </div>

      <div className="topsis-tab-content">
        {renderActiveTab()}
      </div>
    </div>
  );
};

export default TopsisRatingForm;
