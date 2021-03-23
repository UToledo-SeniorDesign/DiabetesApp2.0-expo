/**
 * This file will handle signing-up and login users.
 * Creates API request to validate whether a user exists in the DB 
 * 
*/

import axios, { AxiosResponse } from 'axios';

import type { IUser } from '../types/users-types';

interface ISignUpDataResponse extends IUser {
    /**
     * Interface for the response.data for a successful response when signing up a user.
     * For now the backend is sending back the created user in the DB
     */
    _id: string;
}

interface IErrorResponse {
    // Interface for response data from a HTTP request when we get an error
    message: string;
}

const errorHandler = (error: any): string => {
    /**
     * Function handles the output error message given an error from a catch block
     * @param error is an error from a catch block when making a async-await request
     * @return String that will be the output error message to display
    */

    let errorMessage:string;
         if (error.response){
             // Request made and server responded, response.status has the HTTP error code we got back
             const response:AxiosResponse = error.response;      // Save the response as AxiosResponse type
             const data:IErrorResponse = response.data;          // Get the data from the response
             errorMessage = data.message;                        // Get the error message from the data
             return errorMessage;                                // Return the error to display in the app
         }else if (error.request){
             // The request was made but no response was received from the server
            //  console.log(error.request);
             errorMessage = "There was an error on our side, please try again later."
             return errorMessage;
         } else{
             // Something happened in setting up the request that triggered an Error
             console.log('Error', error.message);
             errorMessage = "Some error occurred, please try again later."
             return errorMessage;
         }
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
        const data = response.data;
        const user:IUser = data.user;
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

        const data:ISignUpDataResponse = response.data;     // Destructure the data from the response
        console.log(data);
        return true;                                        // Return true as the user was created
        // We get here if we got an 'Ok' response, aka a 200 HTTP request

    } catch (error) {
        return errorHandler(error);
    }
}

export {
    validateLogin,
    validateSignUp
}