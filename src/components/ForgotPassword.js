import React from 'react';
import { Formik, Form, Field } from 'formik';
import { useNavigate } from 'react-router-dom';
import FormContainer from './FormContainer';
import { forgotPasswordSchema } from '../utils/validationSchemas';

const ForgotPassword = () => {
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    console.log('Forgot password values:', values);
    // Here you would make an API call to send a password reset email/OTP
    navigate('/otp-verification');
  };

  return (
    <FormContainer>
      <div className="form-header">
        <h2>Forgot Password</h2>
        <p>Enter your mail to change your password.</p>
      </div>

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
              />
              {errors.email && touched.email && (
                <div className="error-message">{errors.email}</div>
              )}
            </div>

            <button type="submit" className="form-btn">
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </FormContainer>
  );
};

export default ForgotPassword;