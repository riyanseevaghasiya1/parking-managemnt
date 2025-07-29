import React from 'react';
import { Card } from 'react-bootstrap';
import '../styles/booking.css'; 

const BookingPanel = () => {
  return (
    <Card className="shadow-sm h-100">
      <Card.Body className="text-center p-4">
        <h6 className="text-center mb-4">Booking</h6>
        <h1 className="fw-bold mb-2">250</h1>
        <p className="text-muted mb-3">Booked Today</p>
        <p className="mb-0" style={{color:"#01457C"}}>
          + 10% From<br/> yesterday
        </p>
      </Card.Body>
    </Card>
  );
};

export default BookingPanel;