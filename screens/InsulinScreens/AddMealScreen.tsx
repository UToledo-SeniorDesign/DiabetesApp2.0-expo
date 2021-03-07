import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	StyleSheet,
	TouchableWithoutFeedback,
	ScrollView,
	Keyboard,
	Button,
	Alert,
} from "react-native";

import Input from "../../components/Input";
import LoadMeal from "../../components/Insulin/LoadMeal";
import Colors from "../../constants/Colors";
import FakeMealData, { MealDetail } from "../../services/FakeMealData";

const AddMealScreen = (props: any) => {
	const [addedMeal, setAddedMeal] = useState<MealDetail>({
		name: "",
		brand: "",
		carbsPerServing: "",
		totalServing: "",
	});

	const [addedMeals, setAddedMeals] = useState<MealDetail[]>([]);
	const [isValidMeal, setIsValidMeal] = useState<boolean>(false);
	const [displayModal, setDisplayModal] = useState<boolean>(false);

	const saveMealHandler = () => {
		const savedMeals = FakeMealData.savedMeals;
		const foundMeal = savedMeals.filter((meal) => meal.name === addedMeal.name);
		if (foundMeal.length == 0) {
			savedMeals.push(addedMeal);
			Alert.alert("Successfully saved " + addedMeal.name, "", [
				{
					text: "Back",
					style: "default",
				},
			]);
		} else {
			Alert.alert("Duplicate meal !", "Meal already present", [
				{
					text: "Back",
					style: "destructive",
				},
			]);
		}
	};

	useEffect(() => {
		validateAddedMeal();
	});

	const getTotalCarbs = () => {
		if (
			!isNaN(parseInt(addedMeal.carbsPerServing)) &&
			!isNaN(parseInt(addedMeal.totalServing))
		) {
			return (
				parseInt(addedMeal.carbsPerServing) * parseInt(addedMeal.totalServing)
			).toString();
		} else {
			return "";
		}
	};

	const numberInputHandler = (inputText: string, inputType: string) => {
		setAddedMeal({
			...addedMeal,
			[inputType]: inputText.replace(/[^0-9]/g, ""),
		});
	};

	const stringInputHandler = (inputText: string, inputType: string) => {
		setAddedMeal({
			...addedMeal,
			[inputType]: inputText,
		});
	};

	const validateAddedMeal = () => {
		if (
			addedMeal.name !== "" &&
			addedMeal.carbsPerServing !== "" &&
			addedMeal.totalServing !== ""
		) {
			setIsValidMeal(true);
		} else {
			setIsValidMeal(false);
		}
	};

	const addMealHandler = () => {
		setAddedMeals([...addedMeals, ...[addedMeal]]);

		Alert.alert("Added " + addedMeal.name, "", [
			{
				text: "Okay",
				style: "default",
			},
		]);
		setAddedMeal({
			name: "",
			brand: "",
			carbsPerServing: "",
			totalServing: "",
		});
	};

	const calcInsulinHandler = () => {
		if (
			addedMeal.name !== "" ||
			addedMeal.carbsPerServing !== "" ||
			addedMeal.totalServing !== ""
		) {
			Alert.alert("You have unsaved meal", "Do you want to continue ?", [
				{
					text: "Back",
					style: "destructive",
				},
				{
					text: "Continue without Adding",
					style: "default",
					onPress: () => {
						props.navigation.navigate("Calculate Insulin", {
							meals: addedMeals,
						});
					},
				},
			]);
		} else {
			props.navigation.navigate("Calculate Insulin", {
				meals: addedMeals,
			});
		}
	};

	return (
		<ScrollView>
			<TouchableWithoutFeedback
				onPress={() => {
					Keyboard.dismiss();
				}}
			>
				<View style={styles.screen}>
					<LoadMeal
						displayModal={displayModal}
						onDismiss={() => {
							setDisplayModal(false);
						}}
					></LoadMeal>
					<View style={styles.foodForm}>
						<View style={styles.inputContainer}>
							<Text>Food name: </Text>
							<Input
								blurOnSubmit
								maxLength={15}
								value={addedMeal.name}
								onChangeText={(text: string) => {
									stringInputHandler(text, "name");
								}}
							/>
						</View>
						<View style={styles.inputContainer}>
							<Text>Brand: </Text>
							<Input
								blurOnSubmit
								maxLength={15}
								value={addedMeal.brand}
								onChangeText={(text: string) => {
									stringInputHandler(text, "brand");
								}}
							/>
						</View>
						<View style={styles.inputContainer}>
							<Text>Carbs per Serving: </Text>
							<Input
								blurOnSubmit
								keyboardType="numeric"
								maxLength={4}
								onChangeText={(text: string) => {
									numberInputHandler(text, "carbsPerServing");
								}}
								value={addedMeal.carbsPerServing}
							/>
						</View>
						<View style={styles.inputContainer}>
							<Text>Total Serving: </Text>
							<Input
								blurOnSubmit
								keyboardType="numeric"
								maxLength={2}
								onChangeText={(text: string) => {
									numberInputHandler(text, "totalServing");
								}}
								value={addedMeal.totalServing}
							/>
						</View>
						<View style={styles.inputContainer}>
							<Text>Total Carbs: </Text>
							<Input
								blurOnSubmit
								keyboardType="numeric"
								maxLength={4}
								value={getTotalCarbs()}
								editable={false}
							/>
						</View>
					</View>
					<View style={styles.buttonContainer}>
						<View style={styles.button}>
							<Button
								disabled={!isValidMeal}
								title="Add Meal"
								onPress={addMealHandler}
							/>
						</View>
						<View style={styles.button}>
							<Button
								disabled={addedMeals.length === 0}
								title="Calculate Insulin"
								onPress={calcInsulinHandler}
							/>
						</View>
					</View>
					<View style={styles.buttonContainer}>
						<View style={styles.button}>
							<Button
								disabled={!isValidMeal}
								title="Save Meal"
								color={Colors.secondary}
								onPress={saveMealHandler}
							/>
						</View>
						<View style={styles.button}>
							<Button
								title="Load Meal"
								color={Colors.primary}
								onPress={() => {
									setDisplayModal(true);
								}}
							/>
						</View>
					</View>
				</View>
			</TouchableWithoutFeedback>
		</ScrollView>
	);
};

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
		width: "30%",
	},
});

export default AddMealScreen;
