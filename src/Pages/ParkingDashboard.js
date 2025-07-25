import React, { useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import '../styles/ParkingDashboard.css'
import '../components/ParkingOverview';
import '../components/VehicleVolume';
import ParkingOverview from '../components/ParkingOverview';
import VehicleVolume from '../components/VehicleVolume';
import ModernParkingLayout from '../components/ModernParkingLayout';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const ParkingDashboard = () => {
  const [activeLevel, setActiveLevel] = useState(1);

  // Bar chart data
  const barChartData = {
    labels: ['Level 1', 'Level 2', 'Level 3', 'Level 4', 'Level 5'],
    datasets: [
      {
        data: [50, 40, 75, 35, 60],
        backgroundColor: ['#1f3048', '#ff9d2d', '#3498db', '#2ecc71', '#e74c3c'],
        borderRadius: 20,
        barThickness: 25,
      },
    ],
  };

  // Bar chart options
  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        grid: {
          display: false,
        },
        ticks: {
          display: false,
        },
        border: {
          display: false,
        }
      },
      x: {
        grid: {
          display: false,
        },
        border: {
          display: false,
        }
      },
    },
  };

  // Parking levels data
  const parkingLevels = {
    1: {
      filledSpots: ['A3', 'A8', 'B1', 'B6', 'B7']
    },
    2: {
      filledSpots: ['A1', 'A3', 'A8', 'B1', 'B6', 'B7']
    },
    3: {
      filledSpots: ['A1', 'A3', 'A8', 'B1', 'B6', 'B7']
    },
    4: {
      filledSpots: ['A1', 'A3', 'A8', 'B1', 'B6', 'B7']
    },
    5: {
      filledSpots: ['A1', 'A3', 'A8', 'B1', 'B6', 'B7']
    }
  };

  return (
    <Container fluid className="dashboard-container">
      <Row className="mb-4">
        {/* Available Spaces Card */}
        <Col lg={3} md={12} className="mb-3 mb-lg-0">
          <Card className="dashboard-card h-100">
            <Card.Body>
              <p className="card-title">Parking Space - Level 1</p>
              <p className="label-text">Available Spaces</p>
              <h2 className="space-count">448</h2>
              <div><hr style={{
                color: '#000000',
                backgroundColor: '#000000',
                height: 2,
                borderColor: '#000000', 
                margin: '40px 0'
              }} /></div>
              <div className="vehicle-types">
                <div className="vehicle-item">
                  <div className="vehicle-icon car-icon"></div>
                  <span className="vehicle-label">Car</span>
                  <span className="vehicle-count">150</span>
                </div>
                <div className="vehicle-item">
                  <div className="vehicle-icon truck-icon"></div>
                  <span className="vehicle-label">Truck</span>
                  <span className="vehicle-count">150</span>
                </div>
                <div className="vehicle-item">
                  <div className="vehicle-icon bike-icon"></div>
                  <span className="vehicle-label">Bike</span>
                  <span className="vehicle-count">148</span>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Parking Overview Chart */}
        <Col lg={6} md={12} className="mb-3 mb-lg-0">
          {/* <Card className="dashboard-card h-100" style={{ marginLeft: "10px", marginRight: "10px" }}>
            <Card.Body>
              <h5 className="card-title">Parking Overview</h5>
              <div className="chart-container">
                <Bar data={barChartData} options={barChartOptions} />
              </div>
              <div className="chart-legend">
                <div className="legend-item">
                  <span className="legend-color" style={{ backgroundColor: '#1f3048' }}></span>
                  <span className="legend-label">level 1</span>
                </div>
                <div className="legend-item">
                  <span className="legend-color" style={{ backgroundColor: '#ff9d2d' }}></span>
                  <span className="legend-label">level 2</span>
                </div>
                <div className="legend-item">
                  <span className="legend-color" style={{ backgroundColor: '#3498db' }}></span>
                  <span className="legend-label">level 3</span>
                </div>
                <div className="legend-item">
                  <span className="legend-color" style={{ backgroundColor: '#2ecc71' }}></span>
                  <span className="legend-label">level 4</span>
                </div>
                <div className="legend-item">
                  <span className="legend-color" style={{ backgroundColor: '#e74c3c' }}></span>
                  <span className="legend-label">level 5</span>
                </div>
              </div>
            </Card.Body>
          </Card> */}
          <ParkingOverview/> 
          </Col>

        {/* Vehicle Volume Circle Chart */}
        <Col lg={3} md={12}>
          {/* <Card className="dashboard-card h-100">
            <Card.Body>
              <h5 className="card-title">Vehicle Volume</h5>
              <div className="doughnut-container">
                <div className="doughnut-chart">
                  <svg viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg">
                    <circle r="70" cx="80" cy="80" fill="none" stroke="#f0f0f0" strokeWidth="16" />
                    <circle r="70" cx="80" cy="80" fill="none" stroke="#ff9d2d" strokeWidth="16"
                      strokeDasharray="439.6 439.6" strokeDashoffset="153.86"
                      transform="rotate(-90 80 80)" />
                  </svg>
                  <div className="doughnut-content">
                    <div className="doughnut-value">6548</div>
                    <div className="doughnut-total">10,000</div>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card> */}
          <VehicleVolume/>
        </Col>
      </Row>

      {/* Parking Layout */}
      <Row>
        <Col xs={12}>
         <ModernParkingLayout/>
        </Col>
      </Row>
    </Container>
  );
};
export default ParkingDashboard;