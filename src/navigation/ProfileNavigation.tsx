import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import UserProfile from '../screens/UserScreens/UserProfile';

const Stack = createStackNavigator();

const ProfileNavigation:React.FC<{}> = (prop) => {
	return (
		<Stack.Navigator>
			<Stack.Screen name="Profile" component={UserProfile} />
		</Stack.Navigator>
	);
};

export default ProfileNavigation;
