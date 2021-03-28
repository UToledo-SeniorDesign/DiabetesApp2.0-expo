import React, { useState } from 'react';
import { 
	StyleSheet, 
	View,
	Alert,
	TouchableWithoutFeedback,
	ScrollView,
	Keyboard
} from 'react-native'
import { Formik, FormikProps } from 'formik';

import Input from '../../components/UIElements/Input';
import LoadMeal from '../../components/Insulin/LoadMeal';
import Button from '../../components/UIElements/Button';

import Colors from '../../constants/Colors';
import { AddMealSchema } from '../../util/schema/form-schemas'
import type { IMeal } from '../../types/meal-types';

interface MealScreenProps{
	navigate: any;
}

const MealScreen:React.FC<MealScreenProps> = (props) => {
	const [meal, setMeal] = useState<IMeal>();
	const [meals, setMeals] = useState<IMeal[]>([]);
	const [displayModal, setDisplayModal] = useState<boolean>(false);
	const [loadedMeals, setLoadedMeals] = useState<IMeal[]>([]);

	const loadMealHandler = (newLoadedMeals: IMeal[]):void => {
		setLoadedMeals(newLoadedMeals);
	};

	const addMealHandler = (newMeal: IMeal):void => {
		alert(JSON.stringify(newMeal));
	}

	return (
		<ScrollView>
			<TouchableWithoutFeedback
				onPress={() => Keyboard.dismiss()}
			>
				<View style={styles.screen}>
					{/* <LoadMeal
						displayModal={displayModal}
						onDismiss={() => {
							setDisplayModal(false);
						}}
						onFinishLoad={loadMealHandler}
					/> */}
					{/* Here we create the formik */}
					<Formik
						initialValues={{
							foodName:'',
							foodBrand: '',
							servingCarbs: 0,
							totServings: 0
						} as IMeal}
						onSubmit={addMealHandler}
						validationSchema={AddMealSchema}
					>
						{(formikProp: FormikProps<IMeal>) => (
							
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
								/>
								<View style={styles.buttonContainer}>
									<View style={styles.button}>
										<Button 
											text="Add Meal"
											onPress={formikProp.handleSubmit}
										/>
									</View>
									<View style={styles.button}>
										<Button 
											text="Calculate Insulin"
											onPress={() => alert('Insuling calc part')}
										/>
									</View>
								</View>
								<View style={styles.buttonContainer}>
									<View style={styles.button}>
										<Button
											text="Save Meal"
											onPress={() => alert('Save meal handler')}
										/>
									</View>
									<View style={styles.button}>
										<Button 
											text="Load Meal"
											onPress={() => alert('Load meal!!')}
										/>
									</View>
								</View>
							</View>
						)}
					</Formik>
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
