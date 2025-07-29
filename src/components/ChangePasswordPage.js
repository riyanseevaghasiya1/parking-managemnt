import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import FormContainer from './FormContainer';
import PasswordInput from './PasswordInput';
import { changePasswordSchema } from '../utils/validationSchemas';

const ChangePassword = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setError('');
    setSuccess('');
    setIsLoading(true);
    
    try {
      // Get user data from localStorage to get adminId
      const userData = localStorage.getItem('userData');
      if (!userData) {
        setError('User not found. Please login again.');
        navigate('/login');
        return;
      }
      
      const user = JSON.parse(userData);
      const adminId = user.id || user._id; // Handle different ID field names
      
      if (!adminId) {
        setError('Admin ID not found. Please login again.');
        navigate('/login');
        return;
      }

      // Make API call to change password
      const response = await axios.post(
        `http://localhost:3000/api/Admin/changePassword?adminId=${adminId}`,
        {
          currentPassword: values.currentPassword,
          newPassword: values.newPassword,
          confirmPassword: values.confirmPassword
        }
      );
      
      // Check if change password was successful
      if (response.data && response.data.success) {
        setSuccess(response.data.message || 'Password changed successfully! You will be redirected to login.');
        resetForm();
        
        // Clear user data from localStorage since password changed
        localStorage.removeItem('userData');
        
        // Redirect to login after 2 seconds
        setTimeout(() => {
          navigate('/login');
        }, 2000);
        
        console.log('Password change successful:', response.data.message);
      } else {
        setError(response.data.message || 'Failed to change password. Please try again.');
      }
      
    } catch (err) {
      console.error('Change password error:', err);
      
      // Handle different types of errors
      if (err.response) {
        // Server responded with error status
        if (err.response.status === 400) {
          setError(err.response.data.message || 'Invalid password requirements. Please check your input.');
        } else if (err.response.status === 401) {
          setError('Current password is incorrect. Please try again.');
        } else if (err.response.status === 404) {
          setError('Admin not found. Please login again.');
          setTimeout(() => navigate('/login'), 1500);
        } else if (err.response.status === 422) {
          setError('Passwords do not match. Please check and try again.');
        } else if (err.response.status === 500) {
          setError('Server error. Please try again later.');
        } else {
          setError(err.response.data.message || 'Failed to change password. Please try again.');
        }
      } else if (err.request) {
        // Network error
        setError('Network error. Please check your internet connection and try again.');
      } else {
        // Other error
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <FormContainer>
      <div className="form-header">
        <h2>Change Password</h2>
        <p>Reset your account password!</p>
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
        initialValues={{ 
          currentPassword: '', 
          newPassword: '', 
          confirmPassword: '' 
        }}
        validationSchema={changePasswordSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => (
          <Form>
            <PasswordInput
              label="Current Password*"
              name="currentPassword"
              value={values.currentPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.currentPassword}
              touched={touched.currentPassword}
              placeholder="Enter your current password"
              disabled={isLoading}
            />

            <PasswordInput
              label="New Password*"
              name="newPassword"
              value={values.newPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.newPassword}
              touched={touched.newPassword}
              placeholder="Enter your new password"
              disabled={isLoading}
            />

            <PasswordInput
              label="Confirm New Password*"
              name="confirmPassword"
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.confirmPassword}
              touched={touched.confirmPassword}
              placeholder="Confirm your new password"
              disabled={isLoading}
            />

            <div className="form-bottom">
              <Link 
                to="/dashboard" 
                className="form-link" 
                style={{marginBottom:"20px"}}
              >
                Back to Dashboard
              </Link>
            </div>

            <button 
              type="submit" 
              className="form-btn"
              disabled={isLoading || isSubmitting}
            >
              {isLoading ? 'Changing Password...' : 'Change Password'}
            </button>
          </Form>
        )}
      </Formik>
    </FormContainer>
  );
};

export default ChangePassword;