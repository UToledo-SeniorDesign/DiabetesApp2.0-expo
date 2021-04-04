import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";

import {createMeal} from '../services/meal-service';
import AuthContext from '../util/context/auth-context';

import { IMeal } from "../types/meal-types";
import { AuthUser } from "../types/users-types";

const DUMMY_MEAL:IMeal = {
	name: "monday lunch",
    creator: "",
	totCarbs: 180,
	foodItems: [{
		foodName: 'orange',
		servingCarbs: 10,
		totServings: 3
	}]
}

const HistoryScreen = () => {
	const auth = useContext(AuthContext)
	const [val, setVal] = useState(false);

	useEffect(() => {
		const handler = async(user:AuthUser) => {
			const response:IMeal | null = await createMeal(user, DUMMY_MEAL);
			alert(JSON.stringify(response));
		}
		if (auth.isLoggedIn){
			handler(auth.loggedUser);
		}
			
	},[val]);


	return (
		<View style={styles.screen}>
			<Button 
				title="title"
				onPress={() => setVal(!val)}
			>
				"create meal"
			</Button>
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
