import React, { useState } from "react";
import { Modal, View, Text, StyleSheet, Button } from "react-native";
import Colors from "../../constants/Colors";
import FakeMealData, { MealDetail } from "../../services/FakeMealData";
import SavedMealsTable from "./SavedMealsTable";

const LoadMeal = (props: any) => {
	const [savedMeals, setSavedMeals] = useState<MealDetail[]>([]);
	const [loadedMeals, setLoadedMeals] = useState(new Map<string, MealDetail>());

	const onSelect = (meal: MealDetail, action: string) => {
		const updatedLoadedMeals = new Map(loadedMeals);
		if (action === "load") {
			updatedLoadedMeals.set(meal.name, meal);
		} else if (action === "unload") {
			updatedLoadedMeals.delete(meal.name);
		} else {
			throw new Error("Unrecognized action");
		}
		setLoadedMeals(updatedLoadedMeals);
	};

	const onCancelHandler = () => {
		setLoadedMeals(new Map<string, MealDetail>());
		props.onDismiss();
	};

	console.log(loadedMeals);

	return (
		<View>
			<Modal
				visible={props.displayModal}
				animationType="slide"
				onShow={() => {
					setSavedMeals(FakeMealData.savedMeals);
				}}
			>
				<View style={styles.tableView}>
					<SavedMealsTable
						meals={savedMeals}
						loadedMeals={loadedMeals}
						onSelect={onSelect}
					/>
				</View>
				<View style={styles.buttonContainer}>
					<View style={styles.button}>
						<Button
							title="Load Meal"
							color={Colors.primary}
							onPress={props.onDismiss}
						/>
					</View>
					<View style={styles.button}>
						<Button title="Cancel" onPress={onCancelHandler} />
					</View>
				</View>
			</Modal>
		</View>
	);
};

const styles = StyleSheet.create({
	tableView: {
		flex: 7,
		alignItems: "stretch",
	},
	buttonContainer: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "flex-start",
		width: "100%",
	},
	button: {
		width: "40%",
		padding: 30,
	},
});

export default LoadMeal;
