import React, { useState, useRef, useEffect } from 'react';
import { FaSearch, FaUserCircle, FaBars } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/header.css';
import { FaUserLock } from "react-icons/fa";
import { TiEject } from "react-icons/ti";
import ChangePassword from './ChangePassword';
import LogoutModal from './LogoutModal';

const Header = ({ toggleSidebar }) => {
  const { user, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
    setShowDropdown(false);
  };

  const handleLogoutConfirm = () => {
    logout();
    setShowLogoutModal(false);
    navigate('/login');
  };

  const handleProfile = () => {
    navigate('/profile');
    setShowDropdown(false);
  };

  const handleChangePassword = () => {
    setShowChangePassword(true);
    setShowDropdown(false);
  };

  return (
    <header className="header">
      <button 
        className="menu-button"
        onClick={toggleSidebar}
        aria-label="Toggle menu"
      >
        <FaBars />
      </button>
      <div className="search-container">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search vehicle no..."
          className="search-input"
        />
      </div>
      <div className="user-profile" ref={dropdownRef}>
        <button 
          className="user-button"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <FaUserCircle className="user-icon" />
        </button>
        {showDropdown && (
          <div className="user-dropdown">
            <div className="dropdown-item" onClick={handleProfile}>
              <FaUserCircle className="dropdown-icon" />
              Profile
            </div>
            <div className="dropdown-item" onClick={handleChangePassword}>
              <FaUserLock  className="dropdown-icon"/>
              Change Password
            </div>
            <div className="dropdown-item" onClick={handleLogoutClick}>
              <TiEject  className="dropdown-icon"/>
              Logout
            </div>
          </div>
        )}
      </div>
      <ChangePassword 
        isOpen={showChangePassword} 
        onClose={() => setShowChangePassword(false)} 
      />
      <LogoutModal 
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onLogout={handleLogoutConfirm}
      />
    </header>
  );
};

export default Header;