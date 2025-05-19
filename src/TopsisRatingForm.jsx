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
    <div className="container">
      <h2>TOPSIS Rating Tool</h2>
      <div className="tabs">
        <button
          className={activeTab === 'capture' ? 'tab active' : 'tab'}
          onClick={() => setActiveTab('capture')}
        >
          Carbon Capture
        </button>
        <button
          className={activeTab === 'separation' ? 'tab active' : 'tab'}
          onClick={() => setActiveTab('separation')}
        >
          Carbon Separation
        </button>
        <button
          className={activeTab === 'utilization' ? 'tab active' : 'tab'}
          onClick={() => setActiveTab('utilization')}
        >
          Carbon Utilization
        </button>
      </div>

      <div className="tab-content">
        {renderActiveTab()}
      </div>
    </div>
  );
};

export default TopsisRatingForm;
