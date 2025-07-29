import React, { useState } from 'react';
import '../styles/shiftTime.css';
import TimePicker from '../components/TimePicker';

const ShiftTime = () => {
  const [shiftData, setShiftData] = useState({
    shiftName: '',
    startTime: '',
    endTime: ''
  });

  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShiftData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTimeSelect = (type, hour, minute, period) => {
    const time = `${hour}:${minute} ${period}`;
    setShiftData(prev => ({
      ...prev,
      [type]: time
    }));
    if (type === 'startTime') {
      setShowStartTimePicker(false);
    } else {
      setShowEndTimePicker(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Shift data:', shiftData);
    // Add your submit logic here
  };

  return (
    <div className="shift-time-container">
      <h2>Shift Time</h2>
      
      <div className="shift-time-form">
      <div className="time-inputs">
      <div className="form-group">
          <input
            type="text"
            name="shiftName"
            value={shiftData.shiftName}
            onChange={handleInputChange}
            placeholder="Shift Name"
            required
          />
        </div>
      </div>

        <div className="time-inputs">
          <div className="form-group">
            <input
              type="text"
              value={shiftData.startTime}
              placeholder="Start Time"
              onClick={() => setShowStartTimePicker(true)}
              readOnly
            />
            {showStartTimePicker && (
              <TimePicker
                onSelect={(hour, minute, period) => handleTimeSelect('startTime', hour, minute, period)}
                onClose={() => setShowStartTimePicker(false)}
                initialValue={shiftData.startTime}
              />
            )}
          </div>

          <div className="form-group">
            <input
              type="text"
              value={shiftData.endTime}
              placeholder="End Time"
              onClick={() => setShowEndTimePicker(true)}
              readOnly
            />
            {showEndTimePicker && (
              <TimePicker
                onSelect={(hour, minute, period) => handleTimeSelect('endTime', hour, minute, period)}
                onClose={() => setShowEndTimePicker(false)}
                initialValue={shiftData.endTime}
              />
            )}
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="add-shift-btn" onClick={handleSubmit}>
            Add Shift
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShiftTime;