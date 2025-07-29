import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import FormContainer from './FormContainer';
import PasswordInput from './PasswordInput';
import { loginSchema } from '../utils/validationSchemas';

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    setLoading(true);
    setError('');
    
    
    try {
      const response = await axios.post('http://localhost:3000/api/Admin/loginAdmin', {
        email: values.email,
        password: values.password
      });


      // Check if login was successful
      if (response.data && response.data.success) {
        // Store user data in localStorage (without token)
        if (response.data.admin) {
          localStorage.setItem('userData', JSON.stringify(response.data.admin));
        }
        
        // Show success message (optional)
        console.log('Login successful:', response.data.message);
        
        // Redirect to dashboard
        navigate('/dashboard');
      } else {
        setError(response.data.message || 'Login failed. Please try again.');
      }
    } catch (err) {
      console.error('Login error:', err);
      
      // Handle different types of errors
      if (err.response) {
        // Server responded with error status
        if (err.response.status === 401) {
          setError('Invalid email or password');
        } else if (err.response.status === 404) {
          setError('User not found');
        } else if (err.response.status === 500) {
          setError('Server error. Please try again later.');
        } else {
          setError(err.response.data.message || 'Login failed. Please try again.');
        }
      } else if (err.request) {
        // Network error
        setError('Network error. Please check your connection and try again.');
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
        <h2>Login</h2>
        <p>Welcome!</p>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={loginSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, handleChange, handleBlur }) => (
          <Form>
            <div className="custom-form-control">
              <label htmlFor="email">Email*</label>
              <Field
                type="email"
                id="email"
                name="email"
                className="form-control"
                placeholder="Enter your email"
                disabled={loading}
              />
              {errors.email && touched.email && (
                <div className="error-message">{errors.email}</div>
              )}
            </div>
            
            <PasswordInput
              label="Password*"
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.password}
              touched={touched.password}
              placeholder="Enter your password"
              disabled={loading}
            />

            <div className="form-bottom">
              <Link to="/forgot-password" className="form-link" style={{marginBottom:"20px"}}>
                Forgot password?
              </Link>
            </div>

            <button type="submit" className="form-btn" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </Form>
        )}
      </Formik>
    </FormContainer>
  );
};

export default Login;