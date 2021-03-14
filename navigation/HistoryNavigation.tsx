import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HistoryScreen from "../screens/HistoryScreen";

const Stack = createStackNavigator();

const HistoryNavigation = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen name="History" component={HistoryScreen} />
		</Stack.Navigator>
	);
};

export default HistoryNavigation;
