/**
 * This file will handle fetching and sending meal data
 * 
*/

import axios from 'axios';

import ErrorHandler from './ErrorHandler';
import type { IMeal } from '../types/meal-types';
import type { AuthUser } from '../types/users-types';

interface GetUserMealData {
    // Interface for the data recieved when requesting a user's meals
    meals: IMeal[]
}

interface CreateMealData{
    // Data recieved when sending a new meal to the backend
    meal: IMeal
}

async function getUserMeals (loggedUser: AuthUser) {
    try {
        const response = await axios.get(`http://10.0.0.3:5000/api/meals/${loggedUser.id}`);
        const data:GetUserMealData = response.data;
        return data.meals;
    } catch (err){
        return null;
    }
}

async function createMeal(newMeal: IMeal) {
    try {
        const response = await axios.post('http://10.0.0.3:5000/api/meals/', {
            creator_id: newMeal.creator,
            meal_name:  newMeal.name,
            total_carbs:newMeal.totCarbs,
            food_items: newMeal.foodItems
        });
        const data:CreateMealData = response.data;
        return data.meal;
    } catch(err){
        const errMsg = ErrorHandler(err);
        return errMsg;
    }
}

export {
    getUserMeals,
    createMeal
}