/**
 * This context assits to keep track of the meals saved from the users
 * More information about context: https://reactjs.org/docs/context.html
**/

import { createContext } from 'react';

import type { IMeal } from '../../types/meal-types';

interface IMealContext{
    meals: IMeal[]
}

const MealContext = createContext<IMealContext>({
    meals: []
});

export default MealContext;