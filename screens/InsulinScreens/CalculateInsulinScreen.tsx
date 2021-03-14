import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MealDetail } from "../../services/FakeMealData";

const CalculateInsulinScreen = (props: any) => {
	const getTotalCarbs = () => {
		let totalCarbs = 0;
		props.route.params.meals.forEach((meal: MealDetail) => {
			totalCarbs +=
				parseInt(meal.carbsPerServing) * parseInt(meal.totalServing);
		});
		return totalCarbs;
	};

	return (
		<View style={styles.screen}>
			<Text>total carbs: {getTotalCarbs()}</Text>
		</View>
	);
};
const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});

export default CalculateInsulinScreen;
