import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Table } from 'react-bootstrap';
import { Area } from 'recharts';
import { LineChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Car, Truck, Bike } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/RevenueTracker.css';

const RevenueTracker = () => {
  const [activeTab, setActiveTab] = useState('Weekly');
  
  // Sample data for the chart
  const chartData = [
    { time: '12:00', value: 2000 },
    { time: '13:00', value: 1500 },
    { time: '14:00', value: 3000 },
    { time: '15:00', value: 4200 },
    { time: '16:00', value: 3400 },
    { time: '17:00', value: 2200 },
    { time: '18:00', value: 3100 },
  ];

  // Calendar data for September 2024
  const days = Array.from({ length: 30 }, (_, i) => i + 1);
  const currentDay = 20; // Highlighted day

  // Recent transactions data
  const recentTransactions = [
    { id: 1, vehicle: 'Car', plateNo: 'TN 12 AB 5768', duration: '30 Mins Duration', amount: '₹ 200' },
    { id: 2, vehicle: 'Truck', plateNo: 'TN 12 AB 5768', duration: '30 Mins Duration', amount: '₹ 200' },
    { id: 3, vehicle: 'Motorcycle', plateNo: 'TN 12 AB 5768', duration: '45 Mins Duration', amount: '₹ 100' },
    { id: 4, vehicle: 'Car', plateNo: 'TN 12 AB 5768', duration: '30 Mins Duration', amount: '₹ 200' },
    { id: 5, vehicle: 'Motorcycle', plateNo: 'TN 12 AB 5768', duration: '30 Mins Duration', amount: '₹ 100' },
  ];

  // Function to render the vehicle icon
  const getVehicleIcon = (vehicle) => {
    switch (vehicle) {
      case 'Car':
        return <Car size={20} />;
      case 'Truck':
        return <Truck size={20} />;
      case 'Motorcycle':
        return <Bike size={20} />;
      default:
        return null;
    }
  };

  return (
    <Container fluid className="revenue-dashboard p-4">
      <Row className="mb-4">
        <Col md={7}>
          <Card className="revenue-card p-4">
            <div className="d-flex justify-content-between">
              <div>
                <h6 className="text-dark">Total Revenue</h6>
                <h2 className="mt-2">₹ 21,596</h2>
                <p className="text-success mb-0">+ 10.36% yesterday Earning</p>
              </div>
              <div className="d-flex">
                <div className="mr-4 text-center">
                  <h6>Online Transactions</h6>
                  <h4>₹ 3214</h4>
                </div>
                <div className="text-center ms-5">
                  <h6>Offline Transactions</h6>
                  <h4>₹ 3214</h4>
                </div>
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={7}>
          <Card className="p-4">
            <div className="d-flex justify-content-between mb-4">
              <div>
                <h5>Revenue Analytics</h5>
                <div className="d-flex align-items-center">
                  <div className="me-4">
                    <span className="text-muted">Today</span>
                    <div className="d-flex align-items-center">
                      <span className="text-success me-2">↗</span>
                      <span>₹4520</span>
                    </div>
                  </div>
                  <div>
                    <span className="text-muted">Yesterday</span>
                    <div className="d-flex align-items-center">
                      <span className="text-success me-2">↗</span>
                      <span>₹4260</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="chart-tabs">
                <Button 
                  variant={activeTab === 'Weekly' ? 'dark' : 'light'} 
                  onClick={() => setActiveTab('Weekly')}
                  className="me-2"
                >
                  Weekly
                </Button>
                <Button 
                  variant={activeTab === 'Monthly' ? 'dark' : 'light'} 
                  onClick={() => setActiveTab('Monthly')}
                  className="me-2"
                >
                  Monthly
                </Button>
                <Button 
                  variant={activeTab === 'Yearly' ? 'dark' : 'light'} 
                  onClick={() => setActiveTab('Yearly')}
                >
                  Yearly
                </Button>
              </div>
            </div>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="time" axisLine={false} tickLine={false} />
                  <YAxis hide={true} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#000', 
                      color: '#fff',
                      border: 'none',
                      borderRadius: '4px'
                    }}
                    labelStyle={{ color: '#fff' }}
                    formatter={(value) => [`₹${value}`, 'Value']}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#8884d8" 
                    fillOpacity={0.2}
                    fill="url(#colorGradient)" 
                  />
                  <defs>
                    <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#8884d8" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>
        <Col md={5}>
          <Card className="p-4">
            <div className="text-center mb-3">
              <div className="d-flex justify-content-between align-items-center">
                <span className="calendar-nav">{'<'}</span>
                <h5 className="mb-0">September 2024</h5>
                <span className="calendar-nav">{'>'}</span>
              </div>
            </div>
            <div className="calendar">
              <div className="calendar-header d-flex justify-content-between">
                <div className="day-label">Mon</div>
                <div className="day-label">Tue</div>
                <div className="day-label">Wed</div>
                <div className="day-label">Thu</div>
                <div className="day-label">Fri</div>
                <div className="day-label">Sat</div>
                <div className="day-label">Sun</div>
              </div>
              <div className="calendar-grid">
                {Array.from({ length: 42 }, (_, i) => {
                  const day = i - 2 + 1; // Adjust for September starting on a specific day
                  return (
                    <div 
                      key={i} 
                      className={`calendar-day ${day === currentDay ? 'current-day' : ''} ${day < 1 || day > 30 ? 'empty-day' : ''}`}
                    >
                      {day > 0 && day <= 30 ? day : ''}
                    </div>
                  );
                })}
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col md={5}>
          <Card className="p-4">
            <h5 className="mb-4">Recent Transactions</h5>
            <div className="transactions-list">
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="transaction-item d-flex justify-content-between align-items-center mb-3">
                  <div className="d-flex align-items-center">
                    <div className="vehicle-icon me-3">
                      {getVehicleIcon(transaction.vehicle)}
                    </div>
                    <div>
                      <div className="font-weight-bold">{transaction.plateNo}</div>
                      <div className="text-muted small">{transaction.duration}</div>
                    </div>
                  </div>
                  <div className="transaction-amount">
                    {transaction.amount}
                  </div>
                </div>
              ))}
            </div>
            <Button variant="dark" className="w-100 mt-3">Download</Button>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default RevenueTracker;