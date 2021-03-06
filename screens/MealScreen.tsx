import React from "react";
import { View, Text, StyleSheet } from "react-native";

const MealScreen = () => {
	return (
		<View style={styles.screen}>
			<Text>Meal sections</Text>
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

export default MealScreen;
