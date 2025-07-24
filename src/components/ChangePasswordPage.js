import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import FormContainer from './FormContainer';
import PasswordInput from './PasswordInput';
import { changePasswordSchema } from '../utils/validationSchemas';
import { useAuth } from '../contexts/AuthContext';

const ChangePassword = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setError('');
    setSuccess('');
    setIsLoading(true);
    
    try {
      // Here you would typically make an API call to change password
      // For demo purposes, we'll simulate the API call
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // You would make actual API call here like:
      // const response = await changePasswordAPI({
      //   currentPassword: values.currentPassword,
      //   newPassword: values.newPassword,
      //   userId: user.id
      // });
      
      // For demo, we'll assume success
      const mockResponse = { success: true };
      
      if (mockResponse.success) {
        setSuccess('Password changed successfully! You will be redirected to login.');
        resetForm();
        
        // Redirect to login after 2 seconds
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setError('Failed to change password. Please try again.');
      }
      
    } catch (err) {
      // Handle different types of errors
      if (err.message.includes('Current password is incorrect')) {
        setError('Current password is incorrect. Please try again.');
      } else if (err.message.includes('Password requirements')) {
        setError('New password does not meet requirements.');
      } else if (err.message.includes('Network error')) {
        setError('Network error. Please check your connection and try again.');
      } else {
        setError(err.message || 'An error occurred while changing password. Please try again.');
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