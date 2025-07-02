import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import CheckInOutPanel from '../components/CheckInOutPanel';
import ParkingOverview from '../components/ParkingOverview';
import VehicleVolume from '../components/VehicleVolume';
import RevenueAnalytics from '../components/RevenueAnalytics';
import BookingPanel from '../components/BookingPanel';
import ParkingPanel from '../components/ParkingPanel';
import CurrentRevenue from '../components/CurrentRevenue';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('Dashboard');

  return (
    <Container fluid className="py-3">
    <Row className="mb-5">
      <Col lg={6}>
        <CheckInOutPanel />
      </Col>
      <Col lg={6}>
        <ParkingOverview />
      </Col>
    </Row>
    <Row className="mb-5">
      <Col lg={3} className='r_vehicle' >
        <VehicleVolume />
      </Col>
      <Col lg={9} className='ps-3'>
        <RevenueAnalytics />
      </Col>
    </Row>
    <Row>
      <Col lg={4} className='r_booking'>
        <BookingPanel />
      </Col>
      <Col lg={4} className='r_booking'>
        <ParkingPanel />
      </Col>
      <Col lg={4}>
        <CurrentRevenue />
      </Col>
    </Row>
  </Container>
  );
};

export default Dashboard;