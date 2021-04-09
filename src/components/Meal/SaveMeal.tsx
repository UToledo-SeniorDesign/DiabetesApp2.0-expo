import React from 'react';
import { SafeAreaView, View } from 'react-native';

import type { IFoodItem, IMeal } from '../../types/meal-types';

interface SaveMealProps {
    foodItems: IFoodItem[];         // New food items to create
    userMeals: IMeal[];             // The meals the user has already saved
}

const SaveMeal:React.FC<SaveMealProps> = (props) => {

    return (
        <SafeAreaView>
            <View>

            </View>
        </SafeAreaView>
    )
}

