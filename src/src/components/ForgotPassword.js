import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import FormContainer from './FormContainer';
import { forgotPasswordSchema } from '../utils/validationSchemas';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      const response = await axios.post('http://localhost:3000/api/Admin/forgotPassword', {
        email: values.email
      });

      // Check if forgot password request was successful
      if (response.data && response.data.success) {
        // Show success message
        setSuccess(response.data.message || 'Password reset link sent to your email successfully!');
        
        // Store email for OTP verification if needed
        localStorage.setItem('resetEmail', values.email);
        
        // Optional: Navigate to OTP verification page after a delay
        setTimeout(() => {
          navigate('/otp-verification');
        }, 2000);
        
        console.log('Forgot password successful:', response.data.message);
      } else {
        setError(response.data.message || 'Failed to send reset link. Please try again.');
      }
    } catch (err) {
      console.error('Forgot password error:', err);
      
      // Handle different types of errors
      if (err.response) {
        // Server responded with error status
        if (err.response.status === 404) {
          setError('Email address not found. Please check your email and try again.');
        } else if (err.response.status === 400) {
          setError('Invalid email address. Please enter a valid email.');
        } else if (err.response.status === 500) {
          setError('Server error. Please try again later.');
        } else {
          setError(err.response.data.message || 'Failed to send reset link. Please try again.');
        }
      } else if (err.request) {
        // Network error
        setError('Network error. Please check your internet connection and try again.');
      } else {
        // Other error
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormContainer>
      <div className="form-header">
        <h2>Forgot Password</h2>
        <p>Enter your mail to change your password.</p>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {success && (
        <div className="alert alert-success" role="alert">
          {success}
        </div>
      )}

      <Formik
        initialValues={{ email: '' }}
        validationSchema={forgotPasswordSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="custom-form-control">
              <label htmlFor="email">Email*</label>
              <Field
                type="email"
                id="email"
                name="email"
                className="form-control"
                placeholder="Enter your email address"
                disabled={loading}
              />
              {errors.email && touched.email && (
                <div className="error-message">{errors.email}</div>
              )}
            </div>

            <button type="submit" className="form-btn" disabled={loading}>
              {loading ? 'Sending...' : 'Submit'}
            </button>
          </Form>
        )}
      </Formik>
    </FormContainer>
  );
};

export default ForgotPassword;