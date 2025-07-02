import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const PasswordInput = ({ 
  label, 
  name, 
  value, 
  onChange, 
  onBlur, 
  error, 
  touched, 
   
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="custom-form-control">
      {label && <Form.Label htmlFor={name}>{label}</Form.Label>}
      <div className="password-input-container">
        <Form.Control
          type={showPassword ? "text" : "password"}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className="form-control"
          isInvalid={touched && error}
        />
        <button
          type="button"
          className="password-toggle"
          onClick={togglePasswordVisibility}
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>
      {touched && error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default PasswordInput;