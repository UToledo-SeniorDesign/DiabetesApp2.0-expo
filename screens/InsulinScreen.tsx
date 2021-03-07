import React from "react";
import { View, Text, StyleSheet } from "react-native";

const InsulinScreen = () => {
	return (
		<View style={styles.screen}>
			<Text>Insulin section</Text>
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

export default InsulinScreen;
