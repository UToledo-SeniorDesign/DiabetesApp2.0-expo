import React from "react";
import { View, Text, StyleSheet } from "react-native";

const HistoryScreen = () => {
	return (
		<View style={styles.screen}>
			<Text>History section</Text>
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
