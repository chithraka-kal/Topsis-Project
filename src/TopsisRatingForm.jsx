import React, { useState } from 'react';
import CaptureForm from './CaptureForm';
import SeparationForm from './SeparationForm';
import UtilizationForm from './UtilizationForm';
import './TopsisForm.css';

const TopsisRatingForm = () => {
  const [activeTab, setActiveTab] = useState('capture');

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'capture':
        return <CaptureForm />;
      case 'separation':
        return <SeparationForm />;
      case 'utilization':
        return <UtilizationForm />;
      default:
        return null;
    }
  };

  return (
    <div className="topsis-container">
      <h2 className="topsis-title">TOPSIS Rating Tool</h2>

      <div className="topsis-description">
        <h4>Select a Carbon Management Strategy</h4>
        
      </div>

      <div className="topsis-tabs">
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
