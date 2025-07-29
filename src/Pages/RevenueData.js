import React, { useState } from 'react';
import { Container, Row, Col, Card, Badge, Button } from 'react-bootstrap';
import { FaCarSide, FaTruck, FaMotorcycle } from 'react-icons/fa';
import { FaPlus } from "react-icons/fa";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/RevenueData.css';
import RevenueAnalytics from '../components/RevenueAnalytics';

const RevenueData = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 8)); // Sep 2024
  const [activeDay, setActiveDay] = useState(null);

  const generateCalendarDays = () => {
    const days = [];
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDay = new Date(year, month, 1);
    const firstWeekday = (firstDay.getDay() || 7) - 1; // Adjust so Mon=0
    const lastDate = new Date(year, month + 1, 0).getDate();

    for (let i = firstWeekday - 1; i >= 0; i--) {
      const d = new Date(year, month, -i);
      days.push({ day: d.getDate(), current: false });
    }

    for (let i = 1; i <= lastDate; i++) {
      days.push({ day: i, current: true });
    }

    while (days.length % 7 !== 0) {
      const d = new Date(year, month + 1, days.length - lastDate + 1);
      days.push({ day: d.getDate(), current: false });
    }

    return days;
  };

  const changeMonth = (offset) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + offset));
    setActiveDay(null); // Reset active day on month change
  };

  const getMonthName = (date) => date.toLocaleString('default', { month: 'long', year: 'numeric' });

  const calendarDays = generateCalendarDays();

  const recentTransactions = [
    { id: 1, vehicleType: 'car', plateNumber: 'TN 12 AB 5768', duration: '30 Mins Duration', amount: 200 },
    { id: 2, vehicleType: 'truck', plateNumber: 'TN 12 AB 5768', duration: '30 Mins Duration', amount: 200 },
    { id: 3, vehicleType: 'motorcycle', plateNumber: 'TN 12 AB 5768', duration: '45 Mins Duration', amount: 100 },
    { id: 4, vehicleType: 'car', plateNumber: 'TN 12 AB 5768', duration: '30 Mins Duration', amount: 200 },
    { id: 5, vehicleType: 'motorcycle', plateNumber: 'TN 12 AB 5768', duration: '30 Mins Duration', amount: 100 },
  ];

  const getVehicleIcon = (type) => {
    switch (type) {
      case 'car': return <FaCarSide size={20} />;
      case 'truck': return <FaTruck size={20} />;
      case 'motorcycle': return <FaMotorcycle size={20} />;
      default: return <FaCarSide size={20} />;
    }
  };

  return (
    <Container fluid className="dashboard-container py-4">
      <Row>
        <Col lg={8}>
          {/* Revenue Summary */}
          <Card className="mb-4 shadow-sm">
            <Card.Body className='p-5'>
              <Row>
                <Col md={4}>
                  <div className="revenue-summary">
                    <h4 className="mb-0">Total</h4>
                    <h4 className='r_margin'>Revenue</h4>
                    <h1 className="mt-2 mb-1">₹ 21,596</h1>
                    <Badge className="revenue-badge">
                      <FaPlus className="me-1" /> 10.36% yesterday Earning
                    </Badge>
                  </div>
                </Col>
                <Col md={4} className="r_col1">
                  <div className="transaction-summary">
                    <h5>Online Transactions</h5>
                    <h3>₹ 3214</h3>
                  </div>
                </Col>
                <Col md={4} className="r_col2">
                  <div className="transaction-summary">
                    <h5>Offline Transactions</h5>
                    <h3>₹ 3214</h3>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
          <RevenueAnalytics />
        </Col>

        <Col lg={4}>
          {/* Calendar */}
          <Card className="mb-4 shadow-sm r_">
            <Card.Body>
              <div className="calendar-header">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <div className="calendar-nav">
                    <span className="calendar-nav-btn" onClick={() => changeMonth(-1)}>&lt;</span>
                    <span className="calendar-month">{getMonthName(currentDate)}</span>
                    <span className="calendar-nav-btn" onClick={() => changeMonth(1)}>&gt;</span>
                  </div>
                </div>

                <div className="calendar">
                  <div className="calendar-weekdays">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                      <div key={day} className="weekday">{day}</div>
                    ))}
                  </div>
                  <div className="calendar-days">
                    {calendarDays.map((dayObj, index) => (
                      <div
                        key={index}
                        className={`calendar-day ${!dayObj.current ? 'other-month' : ''} ${dayObj.day === activeDay ? 'active-day' : ''}`}
                        onClick={() => dayObj.current && setActiveDay(dayObj.day)}
                      >
                        {dayObj.day}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>

          {/* Recent Transactions */}
          <Card className="shadow-sm">
            <Card.Body>
              <h5 className="mb-3">Recent Transactions</h5>
              <div className="transactions-list">
                {recentTransactions.map((transaction) => (
                  <div key={transaction.id} className="transaction-item">
                    <div className="transaction-icon">{getVehicleIcon(transaction.vehicleType)}</div>
                    <div className="transaction-details">
                      <div className="transaction-plate">{transaction.plateNumber}</div>
                      <div className="transaction-duration text-muted small">{transaction.duration}</div>
                    </div>
                    <div className="transaction-amount">₹{transaction.amount}</div>
                  </div>
                ))}
              </div>
              <Button variant="dark" className="w-100 mt-3">Download</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default RevenueData;
