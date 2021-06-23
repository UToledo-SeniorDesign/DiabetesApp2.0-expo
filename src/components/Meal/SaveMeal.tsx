import React, { useContext, useState } from 'react';
import { SafeAreaView } from 'react-native';
import { Formik, FormikProps } from 'formik';
import * as Yup from 'yup';

import Input from '../UIElements/Input';
import Button from '../UIElements/Button';
import { createMeal } from '../../services/meal-service';
import type { IFoodItem, IMeal } from '../../types/meal-types';
import MealContext from '../../util/context/meal-context';

interface SaveMealProps {
    foodItems: IFoodItem[];         // New food items to create
    userMeals: IMeal[];             // The meals the user has already saved
    userID: string;                 // ID of the user creating the meal
    onMealCreated?: () => void;     // What to do after successfully creating the meal
}

interface ISaveMealForm{
    newMealName: string;
}

const SaveMeal:React.FC<SaveMealProps> = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const { meals } = useContext(MealContext);
    const { foodItems, userMeals, userID } = props;
    const savedMealNames = userMeals.map(meal => {
        return meal.name;
    });
    const schema = Yup.object().shape({
        newMealName: Yup
            .string()
            .label('newMealName')
            .min(1, 'Meal name is too short.')
            .max(50, 'Meal name is too long.')
            .required('Meal name is required to save your new meal.')
            .notOneOf(savedMealNames, "You already have a meal saved with this name.")
    });

    const onSubmitHandler = async(formValues: ISaveMealForm) => {
        setIsLoading(true);
        // Calculate all the carbs
        let total_carbs = 0;
        foodItems.forEach(foodItem => {
            total_carbs += foodItem.servingCarbs * foodItem.totServings
        });

        const newMeal:IMeal = {
            name: formValues.newMealName,
            totCarbs: total_carbs,
            creator: userID,
            foodItems: foodItems
        }
        const response: string | IMeal = await createMeal(newMeal);
        setIsLoading(false);
        if (typeof(response) === 'string'){
            // We received an error message back
            
        } else{
            // We successfully added the new meal in the backend
            meals.push(response);
            alert(JSON.stringify(response));
        }

    }

    return (
        <SafeAreaView>
            <Formik
                initialValues={{newMealName: ''} as ISaveMealForm}
                onSubmit={async (values) => {
                    await onSubmitHandler(values);
                }}
                validationSchema={schema}
            >
                {(formikProps: FormikProps<ISaveMealForm>) => (
                    <React.Fragment>
                        <Input 
                            label="Meal name"
                            onInput={formikProps.handleChange('newMealName')}
                            error={
                                (formikProps.errors.newMealName && formikProps.touched.newMealName) ? true : false
                            }
                            errorMsg={formikProps.errors.newMealName}
                            contentType="none"
                            value={formikProps.values.newMealName}
                        />
                        <Button 
                            onPress={formikProps.handleSubmit}
                            text="Submit"
                            isLoading={isLoading}
                        />
                    </React.Fragment>
                )}
            </Formik>
        </SafeAreaView>
    )
}

export default SaveMeal;