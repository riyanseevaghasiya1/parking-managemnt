import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { FaArrowTrendUp } from "react-icons/fa6";
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/RevenueAnalytics.css';

// Sample data for the chart to match exactly what's in the image
const data = [
  { time: '12:00', value: 3500 },
  { time: '12:30', value: 4000 },
  { time: '13:00', value: 3200 },
  { time: '13:30', value: 3000 },
  { time: '14:00', value: 3800 },
  { time: '14:30', value: 4200 },
  { time: '15:00', value: 4520 },  // This point will have a dot
  { time: '15:30', value: 4300 },
  { time: '16:00', value: 4100 },
  { time: '16:30', value: 3800 },
  { time: '17:00', value: 3600 },
  { time: '17:30', value: 4200 },
  { time: '18:00', value: 4300 },
];

// Custom tooltip component that displays on hover
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    // Convert time format to show with AM/PM
    const timeValue = label;
    const hour = parseInt(timeValue.split(':')[0]);
    const mins = timeValue.split(':')[1];
    const formattedTime = `${hour > 12 ? hour - 12 : hour}:${mins} ${hour >= 12 ? 'PM' : 'AM'}`;
    
    return (
      <div className="chart-tooltip">
        <p className="tooltip-time">{formattedTime}</p>
        <p className="tooltip-value">${payload[0].value}</p>
      </div>
    );
  }
  return null;
};

// Custom dot for the highlighted point at 15:00
const CustomizedDot = (props) => {
  const { cx, cy, payload } = props;
  
  if (payload.time === '15:00') {
    return (
      <g>
        <circle cx={cx} cy={cy} r={4} fill="#000" />
      </g>
    );
  }
  return null;
};

const RevenueAnalytics = () => {
  const [activeTab, setActiveTab] = useState('weekly');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className='r_top'>
      <Container fluid className="revenue-analytics-container p-3">
      <div className="analytics-header">
        <div className="d-flex justify-content-between align-items-start">
          <div>
            <h2 className="revenue-title">Revenue Analytics</h2>
            <div className="metrics-container">
              <div className="metric-box">
                <div className="metric-labelone">Today</div>
                <div className="metric-value">
                  <FaArrowTrendUp className="arrow-up" /> $4520
                </div>
              </div>
              <div className="metric-box ml-4">
                <div className="metric-label">Yesterday</div>
                <div className="metric-label">&#8377;4760</div>
              </div>
            </div>
          </div>
          <div className="time-selector">
            <div className="button-group">
              <button 
                className={`time-button ${activeTab === 'weekly' ? 'active' : ''}`} 
                onClick={() => handleTabChange('weekly')}
              >
                Weekly
              </button>
              <button 
                className={`time-button ${activeTab === 'monthly' ? 'active' : ''}`}
                onClick={() => handleTabChange('monthly')}
              >
                Monthly
              </button>
              <button 
                className={`time-button ${activeTab === 'yearly' ? 'active' : ''}`}
                onClick={() => handleTabChange('yearly')}
              >
                Yearly
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="chart-container">
        <ResponsiveContainer width="100%" >
          <AreaChart data={data} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#000000" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#000000" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="time" 
              axisLine={{ stroke: '#f0f0f0', strokeWidth: 1 }}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#888' }}
            />
            <Tooltip 
              content={<CustomTooltip />}
              cursor={{ stroke: '#ddd', strokeDasharray: '5 5' }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#000000"
              fillOpacity={1}
              fill="url(#colorGradient)"
              strokeWidth={2}
              activeDot={{ r: 6, stroke: '#000', strokeWidth: 2, fill: '#fff' }}
              dot={<CustomizedDot />}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Container>
    </div>
  );
};
export default RevenueAnalytics;  