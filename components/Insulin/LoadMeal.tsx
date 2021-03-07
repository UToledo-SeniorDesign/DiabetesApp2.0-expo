import React, { useState } from "react";
import { Modal, View, Text, StyleSheet, Button } from "react-native";
import Colors from "../../constants/Colors";
import FakeMealData, { MealDetail } from "../../services/FakeMealData";
import SavedMealsTable from "./SavedMealsTable";

const LoadMeal = (props: any) => {
	const [savedMeals, setSavedMeals] = useState<MealDetail[]>(
		FakeMealData.savedMeals
	);

	const loadSavedMeals = () => {
		setSavedMeals(FakeMealData.savedMeals);
	};

	return (
		<View>
			<Modal
				visible={props.displayModal}
				animationType="slide"
				onShow={loadSavedMeals}
			>
				<View style={styles.tableView}>
					<SavedMealsTable meals={savedMeals} />
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
						<Button title="Back" onPress={props.onDismiss} />
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
