/**
 * This file will handle signing-up and login users.
 * Creates API request to validate whether a user exists in the DB 
 * 
*/

import axios from 'axios';

import errorHandler from './ErrorHandler';
import type { IUser, AuthUser } from '../types/users-types';

interface ResponseData {
    // Attributes sent as 'data' from a successful (200) HTTP request
    user: AuthUser;
}

async function validateLogin(email: string, password: string) {
    /**
     * Function verifies if the provided email/password is a user
     * 
     * @param loginUser, type IUserLogin, contains email and password from LoginScreen
     * @return IUser object if we found the user with the given credentials
     * @return String(error message) if we couldn't find a user with the given credentials
    */

    try {
        const response = await axios.post('http://10.0.0.3:5000/api/users/login', {
            email: email.toLowerCase(),
            password: password
        })
        const data:ResponseData = response.data;
        const user:AuthUser = data.user;
        return user;
    } catch(err){
        const errMsg = errorHandler(err);
        return errMsg;
    }
}

async function validateSignUp(newUser: IUser, password: string) {
    /**
     * Function verifies if the user already exists in the DB
     * 
     * @param newUser is the user trying to sign up to the app
     * @return True[boolean] if we got the user signed up in the backend successfuly
     * @return String with the error message to display to the user
    */

    try {
        const response = await axios.post('http://10.0.0.3:5000/api/users/signup', {
            first_name: newUser.first_name,
            last_name: newUser.last_name,
            email: newUser.email.toLowerCase(),
            password: password,
            image: ''
        });

        const data:ResponseData = response.data;            // Get the data from the respnose
        const user:AuthUser = data.user;                    // Get the created user data from the backend
        return user;                                        // We return the created user with token and id=
    } catch (error) {
        return errorHandler(error);
    }
}

export {
    validateLogin,
    validateSignUp
}