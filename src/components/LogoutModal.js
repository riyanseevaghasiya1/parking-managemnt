import React from 'react';
import '../styles/logoutModal.css';

const LogoutModal = ({ isOpen, onClose, onLogout }) => {
  if (!isOpen) return null;

  return (
    <div className="logout-modal-overlay" onClick={onClose}>
      <div className="logout-modal-content" onClick={e => e.stopPropagation()}>
        <div  className='mb-3'>
        <button className="close-button" onClick={onClose}>×</button>
        </div>
        <div className="r_title">
          <p className='mb-2' style={{fontSize:'20px'}}>Logout</p>
        </div>
        
        <div className="logout-modal-body">
          <p className='text-center'>Are you sure to logout?</p>
        </div>

        <div className="logout-modal-footer mb-3">
          <button className="cancel-button" onClick={onClose}>
            Cancel
          </button>
          <button className="confirm-button" onClick={onLogout}>
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal; 