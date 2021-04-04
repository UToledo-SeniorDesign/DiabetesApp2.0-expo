/**
 * This file will handle fetching and sending meal data
 * 
*/

import axios, { AxiosResponse } from 'axios';

import type { IMeal } from '../types/meal-types';
import type { AuthUser } from '../types/users-types';

interface IErrorResponse {
    // Interface for response data from a HTTP request when we get an error
    message: string;
}

interface GetUserMealData {
    meals: IMeal[]
}

interface CreateMealData{
    meal: IMeal
}

async function getUserMeals (loggedUser: AuthUser) {
    try {
        const response = await axios.get(`http://10.0.0.3:5000/api/meals/${loggedUser.id}`);
        const data:GetUserMealData = response.data;
        return data.meals;
    } catch (err){
        console.log('errorrrr baeeee');
        return null;
    }
}

async function createMeal(user:AuthUser, meal: IMeal) {
    try {
        const response = await axios.post('http://10.0.0.3:5000/api/meals/', {
            creator_id: user.id,
            meal_name: meal.name,
            total_carbs: meal.totCarbs,
            food_items: meal.foodItems
        });
        const data:CreateMealData = response.data;
        return data.meal;
    } catch(err){
        return null;
    }
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

export {
    getUserMeals,
    createMeal
}