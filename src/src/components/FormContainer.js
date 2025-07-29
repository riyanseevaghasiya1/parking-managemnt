import React from 'react';

const FormContainer = ({ children, title }) => {
  return (
    <div className="form-page">
      <h1 className="form-title">Vehicle parking Management System</h1>
      <div className="form-container">
        {children}
      </div>
    </div>
  );
};

export default FormContainer;