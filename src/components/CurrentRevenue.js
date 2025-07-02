import React from 'react';
import { Card } from 'react-bootstrap';
import { BiRupee } from 'react-icons/bi';

const CurrentRevenue = () => {
  return (
    <Card className="shadow-sm h-100">
      <Card.Body className="text-center d-flex flex-column justify-content-center align-items-center">
        <h6 className="text-center mb-4">Current Revenue</h6>
        <div className="text-muted mb-2">
          <BiRupee size={80} />
        </div>
        <h3 className="fw-bolder">8754</h3>
      </Card.Body>
    </Card>
  );
};

export default CurrentRevenue;