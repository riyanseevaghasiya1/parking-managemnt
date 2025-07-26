import React from 'react';
import { Card } from 'react-bootstrap';
import '../styles/Vehiclevolume.css';

const VehicleVolume = () => {
  // Calculate the percentage for the progress
  const current = 6548;
  const total = 10000;
  const percentage = (current / total) * 100;

  // Calculate the stroke dasharray and dashoffset for the circle
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const dashoffset = circumference - (percentage / 100) * circumference;

  return (
    <Card className="shadow-sm h-100 r_vehicle">
      <Card.Body className="d-flex flex-column justify-content-center align-items-center">
        <h6 className="mb-4 text-center">Vehicle Volume</h6>

        <div className="position-relative" style={{ height: '180px', width: '180px' }}>
          <div className="position-absolute w-100 h-100 d-flex align-items-center justify-content-center">
            {/* Background circle */}
            <svg className="position-absolute w-100 h-100" viewBox="0 0 120 120">
              <circle
                cx="60"
                cy="60"
                r={radius}
                fill="none"
                stroke="#f8f9fa"
                strokeWidth="12"
              />
            </svg>

            {/* Progress circle */}
            <svg
              className="position-absolute w-100 h-100"
              style={{ transform: 'rotate(35deg)' }}
              viewBox="0 0 120 120"
            >
              <defs>
                <linearGradient id="orangeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fd7e14" />
                  <stop offset="100%" stopColor="#ffc107" />
                </linearGradient>
              </defs>

              <circle
                cx="60"
                cy="60"
                r={radius}
                fill="none"
                stroke="url(#orangeGradient)"
                strokeWidth="12"
                strokeDasharray={circumference}
                strokeDashoffset={dashoffset}
                strokeLinecap="round"
              />
            </svg>

            {/* Center text */}
            <div className="position-absolute d-flex flex-column justify-content-center align-items-center">
              <div >{current}/</div>
              <div className="small">{total}</div>
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default VehicleVolume;
