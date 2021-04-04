import React, { useState, useEffect, useContext } from 'react';
import { 
	StyleSheet, 
	View,
	TouchableWithoutFeedback,
	ScrollView,
	Keyboard,
	Text
} from 'react-native'
import { Formik, FormikHelpers, FormikProps } from 'formik';
import {Card} from 'react-native-paper';

import Input from '../../components/UIElements/Input';
import LoadMeal from '../../components/Insulin/LoadMeal';
import Button from '../../components/UIElements/Button';

import AuthContext from '../../util/context/auth-context';
import { AddMealSchema } from '../../util/schema/form-schemas'
import { getUserMeals } from '../../services/meal-service';

import type { IMeal, IFoodItem } from '../../types/meal-types';

interface MealScreenProps{
	navigate: any;
}

const MealScreen:React.FC<MealScreenProps> = (props) => {
	const { loggedUser } = useContext(AuthContext);
	const [createdFoods, setCreatedFoods] = useState<IFoodItem[]>([]);
	const [displayModal, setDisplayModal] = useState<boolean>(false);
	const [savedMeals, setSavedMeals] = useState<IMeal[]>([]);

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
		// Now lets add every food item in those meals to the newMeal
		// let tempMeal = newMeal;

		// for (let i = 0; i < selectedMeals.length; i++){
		// 	const meal = selectedMeals[i];
		// 	const foods = meal.foodItems;
		// 	foods.forEach(food => {
		// 		tempMeal.foodItems.push(food);
		// 		tempMeal.totCarbs += food.servingCarbs * food.totServings;
		// 	});
		// }
		// setNewMeal(tempMeal)
	};

	const addItemHanlder = (newFood: IFoodItem, formikHelper: FormikHelpers<IFoodItem>) => {
		// Add the Food item to the current meal we are building
		// createdFoods.push(newFood);
		const newFoods = [...createdFoods, newFood];
		setCreatedFoods(newFoods);
		
		// Now lets reset the form to let the user input a new food item
		formikHelper.resetForm({
			values: {
				foodName: '',
				foodBrand: '',
				totServings: 0,
				servingCarbs: 0
			}
		});
	}

	return (
		<ScrollView>
			<TouchableWithoutFeedback
				onPress={() => Keyboard.dismiss()}
			>
				<View style={styles.screen}>
					<LoadMeal
						savedMeals={savedMeals}
						displayModal={displayModal}
						onDismiss={() => setDisplayModal(false)}
						onFinishLoad={loadMealHandler}
					/>
					<Formik
						initialValues={{
							foodName:'',
							foodBrand: '',
							servingCarbs: 0,
							totServings: 0,
						} as IFoodItem}
						onSubmit={(values, actions) => addItemHanlder(values, actions)}
						validationSchema={AddMealSchema}
					>
						{(formikProp: FormikProps<IFoodItem>) => (
							
							<View style={styles.foodForm}>
								<Input
									label="Food Name"
									onInput={formikProp.handleChange('foodName')}
									error={
										(formikProp.errors.foodName && formikProp.touched.foodName)? true : false
									}
									errorMsg={formikProp.errors.foodName}
									keyboardType='default'
									contentType='none'
									value={formikProp.values.foodName}
								/>
								<Input
									label="Food Brand"
									onInput={formikProp.handleChange('foodBrand')}
									error={
										(formikProp.errors.foodBrand && formikProp.touched.foodBrand)? true : false
									}
									errorMsg={formikProp.errors.foodBrand}
									keyboardType='default'
									contentType='none'
									value={formikProp.values.foodBrand}
								/>
								<Input
									label="Carbs per Serving"
									onInput={formikProp.handleChange('servingCarbs')}
									error={
										(formikProp.errors.servingCarbs && formikProp.touched.servingCarbs)? true : false
									}
									errorMsg={formikProp.errors.servingCarbs}
									keyboardType='numeric'
									contentType='none'
									value={formikProp.values.servingCarbs.toString()}
								/>
								<Input
									label="Total Servings"
									onInput={formikProp.handleChange('totServings')}
									error={
										(formikProp.errors.totServings && formikProp.touched.totServings)? true : false
									}
									errorMsg={formikProp.errors.totServings}
									keyboardType='numeric'
									contentType='none'
									value={formikProp.values.totServings.toString()}
								/>
								<View style={styles.buttonContainer}>
									<View style={styles.button}>
										<Button 
											text="Add Food"
											onPress={() => {
												formikProp.handleSubmit();
												if (formikProp.isValidating && !formikProp.isSubmitting){
													formikProp.resetForm({values: {
														foodName: '',
														foodBrand: '',
														totServings: 0,
														servingCarbs: 0
													}});
												}
											}}
										/>
									</View>
									
								</View>
								<View style={styles.buttonContainer}>
									<View style={styles.button}>
										<Button 
											text="Load Meal"
											onPress={() => setDisplayModal(true)}											
											mode='contained'
										/>
									</View>
									<View style={styles.button}>
										<Button
											text="Save Meal"
											onPress={() => alert('Save meal handler')}
											disabled={createdFoods.length === 0}
										/>
									</View>
								</View>
							</View>
						)}
					</Formik>
					<Card>
						<Card.Content>
							{createdFoods.length === 0 && <Text>No items added yet!</Text>}
							{createdFoods.length > 0 && <Text>{JSON.stringify(createdFoods)}</Text>}
						</Card.Content>
					</Card>
				</View>
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
	foodForm: {
		flex: 3,
		width: "100%",
	},
	inputContainer: {
		marginVertical: 20,
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center",
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
