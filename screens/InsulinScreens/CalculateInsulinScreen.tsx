import React from "react";
import { View, Text, StyleSheet } from "react-native";

const CalculateInsulinScreen = (props: any) => {
	console.log(props.route.params);
	return (
		<View style={styles.screen}>
			<Text>calc section</Text>
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
