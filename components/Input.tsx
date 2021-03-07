import React from "react";
import { StyleSheet, TextInput } from "react-native";

const Input = (props: any) => {
	return (
		<TextInput
			autoCompleteType="off"
			{...props}
			style={{ ...styles.input, ...props.style }}
		></TextInput>
	);
};

const styles = StyleSheet.create({
	input: {
		height: 30,
		borderBottomColor: "grey",
		borderBottomWidth: 1,
	},
});

export default Input;
