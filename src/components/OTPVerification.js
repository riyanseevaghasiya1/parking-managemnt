import React, { useRef, useState } from 'react';
import { Formik, Form } from 'formik';
import { useNavigate } from 'react-router-dom';
import FormContainer from './FormContainer';
import { otpSchema } from '../utils/validationSchemas';

const OTPVerification = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputRefs = useRef([]);

  const handleChange = (index, value) => {
    // Only allow numbers
    if (value && !/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

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

  const handleSubmit = () => {
    const otpValue = otp.join('');
    console.log('OTP Value:', otpValue);
    // Here you would make an API call to verify OTP
    navigate('/change-password');
  };

  const handleResend = () => {
    // Here you would make an API call to resend OTP
    alert('OTP resent successfully!');
  };

  return (
    <FormContainer>
      <div className="form-header">
        <h2>OTP Verification</h2>
        <p>OTP has been sent to abc@gmail.com</p>
      </div>

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
                />
              ))}
            </div>

            <button
              type="button"
              className="form-btn"
              onClick={handleSubmit}
              disabled={otp.join('').length !== 4}
            >
              Verify
            </button>

            <div className="resend-link">
              <span className="resend-text">Didn't receive code? </span>
              <button
                type="button"
                // className="form-link"
                onClick={handleResend}
                style={{ background: 'none', border: 'none', padding: 0, fontWeight:'500' }}
              >
                Resend
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </FormContainer>
  );
};

export default OTPVerification;