import * as Yup from 'yup';

// Login form validation schema
export const loginSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required')
});

// Forgot password validation schema
export const forgotPasswordSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required')
});

// OTP verification schema
export const otpSchema = Yup.object({
  otp: Yup.string()
    .required('OTP is required')
    .length(4, 'OTP must be 4 digits')
});

// Change password schema
export const changePasswordSchema = Yup.object({
  newPassword: Yup.string()
    .required('New password is required')
    .min(8, 'Password must be at least 8 characters'),
  confirmPassword: Yup.string()
    .required('Confirm password is required')
    .oneOf([Yup.ref('newPassword')], 'Passwords must match')
});