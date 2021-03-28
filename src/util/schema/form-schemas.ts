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
        .required('Last Name is required'),
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
        .lowercase()
        .label('Email')
        .email()
        .required('Email is required'),
    password: yup
        .string()
        .label('Password')
        .required('Password is required')
});

const AddMealSchema = yup.object().shape({
    foodName: yup
        .string()
        .label('foodName')
        .required('Food name is required'),
    foodBrand: yup
        .string()
        .ensure()
        .label('foodBrand'),
    servingCarbs: yup
        .number()
        .label('servingCarbs')
        .required('Carbs per serving is required')
        .integer('Total servings needs to be a number')
        .min(1, 'Carbs per serving needs to be equal or greater than one'),
    totServings: yup
        .number()
        .label('totServings')
        .required('Total servings is required')
        .integer('Total servings needs to be a number')
        .min(1, 'Total servings needs to be equal or greater than one')
});

export {
    SignUpSchema,
    LoginSchema,
    AddMealSchema
};