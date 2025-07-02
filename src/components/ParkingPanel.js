import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';

const ParkingPanel = () => {
  return (
    <Card className="shadow-sm h-100">
      <Card.Body className="text-center d-flex flex-column justify-content-center ">
        <h6 className="mb-4 fw-semibold fs-6">Parking</h6>
        <Row className="align-items-center justify-content-center">
          <Col xs={6} className='border-end'>
            <p className="fw-bolder mb-3">Short Time</p>
            <h3 className="fw-bold mb-3">165</h3>
            <p className="text-muted small mb-0">Booked Today</p>
          </Col>
          <Col xs={6}>
            <p className="fw-bold mb-3">Long Time</p>
            <h3 className="fw-bold mb-3">55</h3>
            <p className="text-muted small mb-0">Booked Today</p>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default ParkingPanel;
