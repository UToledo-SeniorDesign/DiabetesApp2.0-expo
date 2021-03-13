import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import InsulinHomeScreen from "../screens/InsulinScreens/InsulinHomeScreen";
import AddMealScreen from "../screens/InsulinScreens/AddMealScreen";

import CalculateInsulinScreen from "../screens/InsulinScreens/CalculateInsulinScreen";

const Stack = createStackNavigator();

const InsulinNavigation = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen name="Insulin Home" component={InsulinHomeScreen} />
			<Stack.Screen name="Add Meal" component={AddMealScreen} />
			<Stack.Screen
				name="Calculate Insulin"
				component={CalculateInsulinScreen}
			/>
		</Stack.Navigator>
	);
};

export default InsulinNavigation;
