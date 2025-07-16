import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import { FaSquare } from "react-icons/fa";
import '../styles/parkingOverview.css';

const parkingData = [
  { level: "level 1", percentage: 50, color: "#0C1220" },
  { level: "level 2", percentage: 40, color: "#D77A01" },
  { level: "level 3", percentage: 75, color: "#0266D6" },
  { level: "level 4", percentage: 35, color: "#107F43" },
  { level: "level 5", percentage: 60, color: "#870F0F" },
];

const ParkingOverview = () => {
  return (
    <Card className="r_padding shadow-sm">
      <Row>
        <Col md={4}>
          <h5 className="text-center">Parking Overview</h5>
          <ul className="list-unstyled">
            {parkingData.map((item, idx) => (
              <li key={idx} className="d-flex align-items-center justify-content-center mb-2">
                <FaSquare color={item.color} className="me-2" />
                <span>{item.level}</span>
              </li>
            ))}
          </ul>
        </Col>
        <Col md={8} className="d-flex justify-content-around align-items-end chart-col" style={{backgroundColor:'#F1F5F9', padding:'10px'}}>
          {parkingData.map((item, idx) => (
         <div key={idx} className="text-center">
          <small className="d-block">{item.percentage}%</small>
         <div
           style={{
             height: "150px",
             width: "20px",
             backgroundColor: "#ddd",
             borderRadius: "10px",
             position: "relative",
             overflow: "hidden",
           }}
         >
           <div
             style={{
               position: "absolute",
               bottom: 0, // Start at bottom
               width: "100%",
               height: `${item.percentage}%`, // Fill upwards
               backgroundColor: item.color,
               transition: "height 0.5s ease-in-out",
               borderRadius: "10px 10px 10px 10px",
             }}
           />
         </div>
        </div>
          ))}
      </Col>
      </Row>
    </Card>
  );
};
export default ParkingOverview;