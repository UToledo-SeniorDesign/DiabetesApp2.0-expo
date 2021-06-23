import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

const HistoryScreen = () => {
	return (
		<View style={styles.screen}>
			<Text>Insulin Dosis History section</Text>
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

export default HistoryScreen;
