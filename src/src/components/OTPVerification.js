import React, { useRef, useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import FormContainer from './FormContainer';
import { otpSchema } from '../utils/validationSchemas';

const OTPVerification = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(['', '', '', '']);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [email, setEmail] = useState('');
  const inputRefs = useRef([]);

  // Get email from localStorage on component mount
  useEffect(() => {
    const resetEmail = localStorage.getItem('resetEmail');
    if (resetEmail) {
      setEmail(resetEmail);
    } else {
      // If no email found, redirect to forgot password
      setError('No email found. Please start the password reset process again.');
      setTimeout(() => {
        navigate('/forgot-password');
      }, 2000);
    }
  }, [navigate]);

  const handleChange = (index, value) => {
    // Only allow numbers
    if (value && !/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Clear any previous errors
    if (error) setError('');

    // Move to next input if current one is filled
    if (value && index < 3) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Move to previous input on backspace if current is empty
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async () => {
    const otpValue = otp.join('');
    
    if (otpValue.length !== 4) {
      setError('Please enter a valid 4-digit OTP');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      const response = await axios.post('http://localhost:3000/api/Admin/VerifyEmail', {
        email: email,
        otp: otpValue
      });

      // Check if OTP verification was successful
      if (response.data && response.data.success) {
        setSuccess(response.data.message || 'OTP verified successfully! Redirecting...');
        
        // Store verification status for change password page
        localStorage.setItem('otpVerified', 'true');
        
        // Redirect to change password after success
        setTimeout(() => {
          navigate('/change-password');
        }, 1500);
        
        console.log('OTP verification successful:', response.data.message);
      } else {
        setError(response.data.message || 'Invalid OTP. Please try again.');
      }
    } catch (err) {
      console.error('OTP verification error:', err);
      
      // Handle different types of errors
      if (err.response) {
        // Server responded with error status
        if (err.response.status === 400) {
          setError('Invalid OTP format. Please enter a 4-digit OTP.');
        } else if (err.response.status === 401) {
          setError('Invalid or expired OTP. Please try again or request a new one.');
        } else if (err.response.status === 404) {
          setError('Email not found. Please start the process again.');
          setTimeout(() => navigate('/forgot-password'), 2000);
        } else if (err.response.status === 410) {
          setError('OTP has expired. Please request a new one.');
        } else if (err.response.status === 429) {
          setError('Too many attempts. Please try again later.');
        } else if (err.response.status === 500) {
          setError('Server error. Please try again later.');
        } else {
          setError(err.response.data.message || 'OTP verification failed. Please try again.');
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

  const handleResend = async () => {
    if (!email) {
      setError('Email not found. Please start the process again.');
      return;
    }

    setResendLoading(true);
    setError('');
    setSuccess('');
    
    try {
      const response = await axios.post('http://localhost:3000/api/Admin/forgotPassword', {
        email: email
      });

      if (response.data && response.data.success) {
        setSuccess('OTP resent successfully! Please check your email.');
        // Clear the current OTP
        setOtp(['', '', '', '']);
        // Focus on first input
        if (inputRefs.current[0]) {
          inputRefs.current[0].focus();
        }
      } else {
        setError(response.data.message || 'Failed to resend OTP. Please try again.');
      }
    } catch (err) {
      console.error('Resend OTP error:', err);
      
      if (err.response) {
        if (err.response.status === 404) {
          setError('Email not found. Please check your email address.');
        } else if (err.response.status === 429) {
          setError('Too many requests. Please wait before requesting again.');
        } else if (err.response.status === 500) {
          setError('Server error. Please try again later.');
        } else {
          setError(err.response.data.message || 'Failed to resend OTP. Please try again.');
        }
      } else if (err.request) {
        setError('Network error. Please check your connection and try again.');
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setResendLoading(false);
    }
  };

  // Format email for display (hide middle part)
  const formatEmailForDisplay = (email) => {
    if (!email) return '';
    const [name, domain] = email.split('@');
    if (name.length <= 3) return email;
    const maskedName = name.charAt(0) + '*'.repeat(name.length - 2) + name.charAt(name.length - 1);
    return `${maskedName}@${domain}`;
  };

  return (
    <FormContainer>
      <div className="form-header">
        <h2>OTP Verification</h2>
        <p>OTP has been sent to {formatEmailForDisplay(email)}</p>
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
        initialValues={{ otp: '' }}
        validationSchema={otpSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form>
            <div className="otp-container">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(ref) => (inputRefs.current[index] = ref)}
                  type="text"
                  maxLength={1}
                  className="otp-input"
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  disabled={loading}
                />
              ))}
            </div>

            <button
              type="button"
              className="form-btn"
              onClick={handleSubmit}
              disabled={otp.join('').length !== 4 || loading}
            >
              {loading ? 'Verifying...' : 'Verify'}
            </button>

            <div className="resend-link">
              <span className="resend-text">Didn't receive code? </span>
              <button
                type="button"
                onClick={handleResend}
                disabled={resendLoading}
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  padding: 0, 
                  fontWeight: '500',
                  color: resendLoading ? '#999' : '#007bff',
                  cursor: resendLoading ? 'not-allowed' : 'pointer'
                }}
              >
                {resendLoading ? 'Sending...' : 'Resend'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </FormContainer>
  );
};

export default OTPVerification;