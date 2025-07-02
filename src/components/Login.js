import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import FormContainer from './FormContainer';
import PasswordInput from './PasswordInput';
import { loginSchema } from '../utils/validationSchemas';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState('');

  const handleSubmit = async (values) => {
    try {
      // Here you would typically make an API call to verify credentials
      // For demo purposes, we'll use a simple check
      if (values.email === 'admin@example.com' && values.password === 'admin123') {
        const userData = {
          email: values.email,
          name: 'Admin User',
          role: 'admin'
        };
        
        // Login the user
        login(userData);
        
        // Redirect to dashboard
        navigate('/dashboard');
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('An error occurred during login. Please try again.');
    }
  };

  return (
    <FormContainer ainer>
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
            />

            <div className="form-bottom">
              <Link to="/forgot-password" className="form-link" style={{marginBottom:"20px" }}>
                Forgot password?
              </Link>
            </div>

            <button type="submit" className="form-btn">
              Login
            </button>
          </Form>
        )}
      </Formik>
    </FormContainer>
  );
};

export default Login;