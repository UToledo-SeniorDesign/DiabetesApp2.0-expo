import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import Colors from "../../constants/Colors";

const InsulinHomeScreen = (props: any) => {
	return (
		<View style={styles.screen}>
			<View style={styles.titleContainer}>
				<Text style={styles.title}>Calculate Insulin</Text>
			</View>
			<View style={styles.buttonContainer}>
				<View style={styles.button}>
					<Button
						title="Meal"
						color={Colors.primary}
						onPress={() => {
							props.navigation.navigate("Add Meal");
						}}
					/>
				</View>
				<View style={styles.button}>
					<Button
						title="No Meal"
						color={Colors.secondary}
						onPress={() => {
							props.navigation.navigate("Calculate Insulin");
						}}
					/>
				</View>
			</View>
		</View>
	);
};
const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	titleContainer: {
		flexDirection: "row",
		alignItems: "flex-end",
		marginTop: 40,
		flex: 1,
	},
	title: {
		fontSize: 30,
	},
	buttonContainer: {
		flex: 1,
		padding: 30,
		width: "100%",
		flexDirection: "row",
		alignItems: "baseline",
		justifyContent: "space-around",
	},
	button: {
		width: "30%",
	},
});

export default InsulinHomeScreen;
