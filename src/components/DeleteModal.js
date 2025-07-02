import React from 'react';
import '../styles/Deletemodal.css';

const DeleteModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
      <div  className='mb-3'>
        <button className="close-button" onClick={onClose}>×</button>
        </div>
        <div className="r_title">
          <p className='mb-2' style={{fontSize:'20px'}}>Delete</p>
        </div>
        <div className="modal-body">
          <p>Are you sure you want to Delete?</p>
        </div>
        <div className="modal-actions">
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button className="confirm-btn" onClick={onConfirm}>
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal; 