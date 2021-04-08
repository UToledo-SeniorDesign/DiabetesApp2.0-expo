/**
 * ErrorHanlder handles the error message to display back to the user when the HTTP 
 * request failes for X reason. Some messages will be sent directly from the backend
 * to display to the user. 
 * Cases that the backend will send messages include 400 and 500 HTTP resutls.
 * This also handles if a request is sent and the backend is offline.
*/

import { AxiosResponse } from 'axios';

interface IErrorResponse {
    // Data received from a 400 and 500 HTTP results from the backedn
    message: string;
}

const errorHandler = (error: any): string => {
    /**
     * Function handles the output error message given an error from a catch block
     * @param error is an error from a catch block when making a async-await request with axios
     * @return String that will be the output error message to display to the user
    */

    let errorMessage:string;
    if (error.response){
        // Request made and server responded, response.status has the HTTP error code we got back
        const response:AxiosResponse = error.response;      // Save the response as AxiosResponse type
        const data:IErrorResponse = response.data;          // Get the data from the response
        errorMessage = data.message;                        // Get the error message from the data
        return errorMessage;                                // Return the error to display in the app
    }
    else if (error.request){
        // The request was made but no response was received from the server
        errorMessage = "There was an error on our side, please try again later."
        return errorMessage;
    } else{
        // Something happened in setting up the request that triggered an Error
        errorMessage = "Some error occurred, please try again later."
        return errorMessage;
    }
}

export default errorHandler;