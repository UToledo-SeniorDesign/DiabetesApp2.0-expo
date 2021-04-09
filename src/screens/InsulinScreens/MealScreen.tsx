import React, { useState, useEffect, useContext } from 'react';
import { 
	StyleSheet, 
	View,
	TouchableWithoutFeedback,
	ScrollView,
	Keyboard,
	Text
} from 'react-native'
import { FormikHelpers } from 'formik';
import {Card} from 'react-native-paper';

import LoadMeal from '../../components/Meal/LoadMeal';
import Button from '../../components/UIElements/Button';
import FoodItemTable from '../../components/Meal/FoodItemTable';
import SaveMeal from '../../components/Meal/SaveMeal';
import CreateFoodItem from '../../components/Meal/CreateFoodItem';

import AuthContext from '../../util/context/auth-context';
import { getUserMeals } from '../../services/meal-service';
import type { IMeal, IFoodItem } from '../../types/meal-types';

interface MealScreenProps{
	navigate: any;
}

const MealScreen:React.FC<MealScreenProps> = (props) => {
	const { loggedUser } = useContext(AuthContext);
	const [createdFoods, setCreatedFoods] = useState<IFoodItem[]>([]);
	const [isLoadingMeal, setIsLoadingMeal] = useState<boolean>(false);
	const [savedMeals, setSavedMeals] = useState<IMeal[]>([]);
	const [isSavingMeal, setIsSavingMeal] = useState(false);

	useEffect(() => {
		const loadMeals = async() => {
			const userMeals = await getUserMeals(loggedUser);
			if (userMeals){
				setSavedMeals(userMeals);
			}
		}
		loadMeals();
	}, [])

	const loadMealHandler = (selectedMeals: IMeal[]) => {
		/**
		 * Here we add/append the food items inside the meal(s) to the createdFoods state
		*/
		
		const newFoods:IFoodItem[] = [];
		selectedMeals.forEach(meal => {
			const foodItems = meal.foodItems;
			foodItems.forEach(newFood => {
				newFoods.push(newFood);
			});
		});

		newFoods.forEach(newFood => {
			setCreatedFoods(oldFoods => [...oldFoods, newFood]);
		});
	};

	const addItemHanlder = (newFood: IFoodItem, formikHelper: FormikHelpers<IFoodItem>) => {
		// Add the Food item to the current meal we are building
		const newFoods = [...createdFoods, newFood];
		setCreatedFoods(newFoods);
		
		// Now lets reset the form to let the user input a new food item
		formikHelper.resetForm({});
	}

	return (
		<ScrollView>
			<TouchableWithoutFeedback
				onPress={() => Keyboard.dismiss()}
			><>
				{isSavingMeal && 
					<SaveMeal 
						foodItems={createdFoods}
						userMeals={savedMeals}
						userID={loggedUser.id}
						onMealCreated={(() => setIsSavingMeal(false))}
					/>
				}
				{!isSavingMeal &&
					<View style={styles.screen}>
						<LoadMeal
							savedMeals={savedMeals}
							displayModal={isLoadingMeal}
							onDismiss={() => setIsLoadingMeal(false)}
							onFinishLoad={loadMealHandler}
						/>
						<CreateFoodItem 
							onCreatedFood={(foodItem, actions) => addItemHanlder(foodItem, actions)}
						/>
						<View style={styles.buttonContainer}>
							<View style={styles.button}>
								<Button 
									text="Load Meal"
									onPress={() => setIsLoadingMeal(true)}							
									mode='contained'
								/>
							</View>
							<View style={styles.button}>
								<Button
									text="Save Meal"
									onPress={() => setIsSavingMeal(true)}
									disabled={createdFoods.length === 0}
								/>
							</View>
						</View>
						<Card>
							<Card.Content>
								{createdFoods.length === 0 && <Text>No items added yet!</Text>}
								{createdFoods.length > 0 && <FoodItemTable foodItems={createdFoods} />}
							</Card.Content>
						</Card>
					</View>
				}</>
			</TouchableWithoutFeedback>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		flexDirection: "column",
		justifyContent: "center",
	},
	buttonContainer: {
		flex: 1,
		padding: 20,
		marginTop: 30,
		width: "100%",
		flexDirection: "row",
		alignItems: "baseline",
		justifyContent: "space-around",
	},
	button: {
		width: "40%",
	},
});

export default MealScreen;