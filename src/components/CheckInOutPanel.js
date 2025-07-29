import React, { useState } from 'react';
import { FaCar, FaTruck, FaMotorcycle } from 'react-icons/fa';
import '../styles/checkInOutPanel.css';

const CheckInOutPanel = () => {
  const [activeTab, setActiveTab] = useState('Check In');
  

  
  return (
    <div className="check-panel">
      <div className="tab-container">
        <div className="tab-group">
          <button 
            className={`tab-button ${activeTab === 'Check In' ? 'active' : ''}`}
            onClick={() => setActiveTab('Check In')}
          >
            Check In
          </button>
          <button 
            className={`tab-button ${activeTab === 'Check Out' ? 'active' : ''}`}
            onClick={() => setActiveTab('Check Out')}
          >
            Check Out
          </button>
        </div>
      </div>

      <div className="stats-container">
        <div className="stat-card">
          <div className="icon-container">
            <FaCar />
          </div>
          <p className="stat-label">Currently Checked In</p>
          <h2 className="stat-value">130</h2>
        </div>

        <div className="stat-card">
          <div className="icon-container">
            <FaTruck />
          </div>
          <p className="stat-label">Currently Checked In</p>
          <h2 className="stat-value">90</h2>
        </div>

        <div className="stat-card">
          <div className="icon-container">
            <FaMotorcycle />
          </div>
          <p className="stat-label">Currently Checked In</p>
          <h2 className="stat-value">50</h2>
        </div>
      </div>
    </div>
  );
};

export default CheckInOutPanel;