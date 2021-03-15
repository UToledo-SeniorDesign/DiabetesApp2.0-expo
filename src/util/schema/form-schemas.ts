/**
 * File contains 'Yup' schemas to be utilized with Formik
 * Each schema is utilized to assist in input validations.
 * For more information about Formik and Yup: https://formik.org/docs/guides/validation
**/

import * as yup from 'yup';

// SignUp Screen input schema
const SignUpSchema = yup.object().shape({
    email: yup
        .string()
        .label('email')
        .lowercase()
        .email('Must be a valid email')
        .required('Email is required'),
    first_name: yup
        .string()
        .label('first_name')
        .required('First Name is required'),
    last_name: yup
        .string()
        .label('last_name')
        .required('First Name is required'),
    password: yup
        .string()
        .label('password')
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters long.'),
    img: yup
        .string()
        .label('image'),
    confirmEmail: yup
        .string()
        .lowercase()
        .email('Must be a valid email')
        .label('confirmEmail')
        .required('Confirm email is required')
        .oneOf([yup.ref('email')], 'Emails do not match'),
    confirmPassword: yup
        .string()
        .label('confirmPassword')
        .required('Confirm password is required')
        .oneOf([yup.ref('password')], 'Passwords do not match')
});

// Login Screen input schema
const LoginSchema = yup.object().shape({
    email: yup
        .string()
        .label('Email')
        .email()
        .required('Email is required'),
    password: yup
        .string()
        .label('Password')
        .required('Password is reqired')
});

export {
    SignUpSchema,
    LoginSchema
};