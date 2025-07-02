import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  FaHome, 
  FaChartLine, 
  FaParking, 
  FaFileAlt, 
  FaUsers, 
  FaClock 
} from 'react-icons/fa';
import '../styles/sidebar.css';

const Sidebar = () => {
  const menuItems = [
    { path: '/dashboard', icon: <FaHome />, label: 'Dashboard' },
    { path: '/revenueudata', icon: <FaChartLine />, label: 'Revenue Data' },
    { path: '/parkingoverview', icon: <FaParking />, label: 'Parking Overview' },
    { path: '/report', icon: <FaFileAlt />, label: 'Report' },
    { path: '/employee', icon: <FaUsers />, label: 'Employee' },
    { path: '/shift-time', icon: <FaClock />, label: 'Shift Time' },
  ];

  return (
    <nav className="sidebar-nav">
      {menuItems.map((item, index) => (
        <NavLink
          key={index}
          to={item.path}
          className={({ isActive }) =>
            `nav-item ${isActive ? 'active' : ''}`
          }
        >
          <span className="nav-icon">{item.icon}</span>
          <span className="nav-label">{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
};

export default Sidebar;

