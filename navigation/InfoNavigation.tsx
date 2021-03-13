import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import InfoScreen from "../screens/InfoScreen";

const Stack = createStackNavigator();

const InfoNavigation = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen name="Info" component={InfoScreen} />
		</Stack.Navigator>
	);
};

export default InfoNavigation;
