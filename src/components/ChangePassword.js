import React, { useState } from 'react';
import '../styles/changePassword.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const ChangePassword = ({ isOpen, onClose }) => {
  const [passwords, setPasswords] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [showPasswords, setShowPasswords] = useState({
    old: false,
    new: false,
    confirm: false
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswords(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmPassword) {
      alert('Both password must match');
      return;
    }
    // Handle password change logic here
    console.log('Changing password:', passwords);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className='text-end'>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        <div className="r_title">
          <p>Change Password</p>
        </div>

        <form onSubmit={handleSubmit} className='r_form'>
          <div className="password-input-group">
            <div className="input-wrapper">
              <p className='mb-0 r_text'>Old Password*</p>
              <div className="password-field">
                <input
                  type={showPasswords.old ? "text" : "password"}
                  name="oldPassword"
                  value={passwords.oldPassword}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => togglePasswordVisibility('old')}
                >
                  {showPasswords.old ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div className="input-wrapper">
              <p className='mb-0 r_text'>New Password*</p>
              <div className="password-field">
                <input
                  type={showPasswords.new ? "text" : "password"}
                  name="newPassword"
                  value={passwords.newPassword}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => togglePasswordVisibility('new')}
                >
                  {showPasswords.new ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div className="input-wrapper">
              <p className='mb-0 r_text'>Confirm New Password*</p>
              <div className="password-field">
                <input
                  type={showPasswords.confirm ? "text" : "password"}
                  name="confirmPassword"
                  value={passwords.confirmPassword}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => togglePasswordVisibility('confirm')}
                >
                  {showPasswords.confirm ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
          </div>

          {passwords.newPassword !== passwords.confirmPassword &&
            passwords.confirmPassword && (
              <p className="error-message">Both password must match</p>
            )}

          <button type="submit" className="change-password-button">
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;