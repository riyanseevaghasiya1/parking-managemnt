import React, { useState } from 'react';
import '../styles/timePicker.css';

const TimePicker = ({ onSelect, onClose, initialValue }) => {
  const hours = ['2', '3', '4'];
  const minutes = ['30', '31', '32'];
  const periods = ['AM', 'PM'];

  const [selectedHour, setSelectedHour] = useState('');
  const [selectedMinute, setSelectedMinute] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('');

  const handleSelect = () => {
    if (selectedHour && selectedMinute && selectedPeriod) {
      onSelect(selectedHour, selectedMinute, selectedPeriod);
    }
  };

  return (
    <div className="time-picker-overlay">
      <div className="time-picker">
        <div className="time-picker-content">
          <div className="time-grid">
            <div className="time-row">
              <div className="time-cell hour">{selectedHour || '2'}</div>
              <div className="time-cell minute">{selectedMinute || '30'}</div>
              <div className="time-cell period">{selectedPeriod || 'AM'}</div>
            </div>
            <div className="time-row">
              <div 
                className={`time-cell hour ${selectedHour === '3' ? 'selected' : ''}`}
                onClick={() => setSelectedHour('3')}
              >   
                3
              </div>
              <div 
                className={`time-cell minute ${selectedMinute === '31' ? 'selected' : ''}`}
                onClick={() => setSelectedMinute('31')}
              >
                31
              </div>
              <div 
                className={`time-cell period ${selectedPeriod === 'PM' ? 'selected' : ''}`}
                onClick={() => setSelectedPeriod('PM')}
              >
                PM
              </div>
            </div>
            <div className="time-row">
              <div 
                className={`time-cell hour ${selectedHour === '4' ? 'selected' : ''}`}
                onClick={() => setSelectedHour('4')}
              >
                4
              </div>
              <div 
                className={`time-cell minute ${selectedMinute === '32' ? 'selected' : ''}`}
                onClick={() => setSelectedMinute('32')}
              >
                32
              </div>
              <div className="time-cell period"></div>
            </div>
          </div>
          <div className="time-picker-actions">
            <button className="cancel-btn" onClick={onClose}>Cancel</button>
            <button className="ok-btn" onClick={handleSelect}>Ok</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimePicker; 