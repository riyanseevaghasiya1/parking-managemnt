import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/style.css';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';


// Import Components
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import OTPVerification from './components/OTPVerification';
import ChangePassword from './components/ChangePassword';
import Dashboard from '../src/Pages/Dashboard';
import Profile from '../src/Pages/Profile';
import Layout from './components/Layout';
import Report from '../src/Pages/Report';
import Employee from '../src/Pages/Employee';
import EmployeeForm from '../src/Pages/EmployeeForm';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';
import ShiftTime from './Pages/ShiftTime';
import RevenueData from './Pages/RevenueData';

import ParkingOverview from './Pages/ParkingDashboard.js';


function App() {
  return (
    <AuthProvider>
      <Router>
        <div>
          <Container fluid>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/otp-verification" element={<OTPVerification />} />
              <Route path="/change-password" element={<ChangePassword />} />
              {/* Protected Routes with Layout */}
              <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/report" element={<Report />} />
                <Route path="/employee" element={<Employee />} />
                <Route path="/employee/add" element={<EmployeeForm />} />
                <Route path="/employee/edit/:id" element={<EmployeeForm />} />
                <Route path="/shift-time" element={<ShiftTime />} />
                <Route path="/revenueudata" element={<RevenueData />} />
                <Route path="/parkingoverview" element={<ParkingOverview/>} />
              </Route>
              {/* Catch all route */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Container>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

