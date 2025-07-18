import React, { useState } from 'react';
import '../styles/ModernParkingLayout.css';

const levels = [1, 2, 3, 4, 5];
const spotsA = ['A1','A2','A3','A4','A5','A6','A7','A8','A9','A10'];
const spotsB = ['B1','B2','B3','B4','B5','B6','B7','B8','B9','B10'];

const filledSpotsByLevel = {
  1: ['A3', 'A8', 'B1', 'B6', 'B7'],
  2: ['A1', 'A3', 'A8', 'B1', 'B6', 'B7'],
  3: ['A1', 'A3', 'A8', 'B1', 'B6', 'B7'],
  4: ['A1', 'A3', 'A8', 'B1', 'B6', 'B7'],
  5: ['A1', 'A3', 'A8', 'B1', 'B6', 'B7'],
};

const ModernParkingLayout = () => {
  const [activeLevel, setActiveLevel] = useState(1);
  const filledSpots = filledSpotsByLevel[activeLevel] || [];

  return (
    <div className="modern-parking-layout-wrapper">
      <div className="modern-level-tabs">
        {levels.map((level) => (
          <button
            key={level}
            className={`modern-level-tab${activeLevel === level ? ' active' : ''}`}
            onClick={() => setActiveLevel(level)}
          >
            Level {level}
          </button>
        ))}
      </div>
      
      <div className="modern-parking-layout">
        <div className="modern-entry-exit left">
          <span className="entry-label">ENTRY</span>
          <span className="exit-label">EXIT</span>
        </div>
        
        <div className="modern-parking-grid">
          {/* Section 1: A and B columns */}
          <div className="parking-section">
            <div className="modern-parking-col">
              {spotsA.map((spot) => (
                <div
                  key={spot}
                  className={`modern-parking-spot${filledSpots.includes(spot) ? ' filled' : ''}`}
                >
                  {spot}
                </div>
              ))}
            </div>
            <div className="modern-parking-col">
              {spotsB.map((spot) => (
                <div
                  key={spot}
                  className={`modern-parking-spot${filledSpots.includes(spot) ? ' filled' : ''}`}
                >
                  {spot}
                </div>
              ))}
            </div>
          </div>
          
          <div className="modern-dashed-divider"></div>
          
          {/* Section 2: A and B columns */}
          <div className="parking-section">
            <div className="modern-parking-col">
              {spotsA.map((spot) => (
                <div
                  key={`s2-${spot}`}
                  className={`modern-parking-spot${filledSpots.includes(spot) ? ' filled' : ''}`}
                >
                  {spot}
                </div>
              ))}
            </div>
            <div className="modern-parking-col">
              {spotsB.map((spot) => (
                <div
                  key={`s2-${spot}`}
                  className={`modern-parking-spot${filledSpots.includes(spot) ? ' filled' : ''}`}
                >
                  {spot}
                </div>
              ))}
            </div>
          </div>
          
          <div className="modern-dashed-divider"></div>
          
          {/* Section 3: A and B columns */}
          <div className="parking-section">
            <div className="modern-parking-col">
              {spotsA.map((spot) => (
                <div
                  key={`s3-${spot}`}
                  className={`modern-parking-spot${filledSpots.includes(spot) ? ' filled' : ''}`}
                >
                  {spot}
                </div>
              ))}
            </div>
            <div className="modern-parking-col">
              {spotsB.map((spot) => (
                <div
                  key={`s3-${spot}`}
                  className={`modern-parking-spot${filledSpots.includes(spot) ? ' filled' : ''}`}
                >
                  {spot}
                </div>
              ))}
            </div>
          </div>
          
          <div className="modern-dashed-divider"></div>
          
          {/* Section 4: A and B columns */}
          <div className="parking-section">
            <div className="modern-parking-col">
              {spotsA.map((spot) => (
                <div
                  key={`s4-${spot}`}
                  className={`modern-parking-spot${filledSpots.includes(spot) ? ' filled' : ''}`}
                >
                  {spot}
                </div>
              ))}
            </div>
            <div className="modern-parking-col">
              {spotsB.map((spot) => (
                <div
                  key={`s4-${spot}`}
                  className={`modern-parking-spot${filledSpots.includes(spot) ? ' filled' : ''}`}
                >
                  {spot}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="modern-entry-exit right">
          <span className="entry-label">ENTRY</span>
          <span className="exit-label">EXIT</span>
        </div>
      </div>
    </div>
  );
};

export default ModernParkingLayout;