import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import MealScreen from "./screens/MealScreen";
import ProfileScreen from "./screens/ProfileScreen";
import HistoryScreen from "./screens/HistoryScreen";
import InformationScreen from "./screens/InformationScreen";
import HomeScreen from "./screens/HomeScreen";

const Tab = createMaterialBottomTabNavigator();

const Navigation = () => {
	return (
		<Tab.Navigator
			initialRouteName="Home"
			activeColor="black"
			barStyle={{ backgroundColor: "tomato" }}
		>
			<Tab.Screen
				name="History"
				component={HistoryScreen}
				options={{
					tabBarLabel: "History",
					tabBarIcon: ({ color }) => (
						<MaterialCommunityIcons name="chart-line" color={color} size={26} />
					),
				}}
			/>
			<Tab.Screen
				name="Info"
				component={InformationScreen}
				options={{
					tabBarLabel: "Info",
					tabBarIcon: ({ color }) => (
						<MaterialCommunityIcons
							name="information-variant"
							color={color}
							size={26}
						/>
					),
				}}
			/>
			<Tab.Screen
				name="Home"
				component={HomeScreen}
				options={{
					tabBarLabel: "Home",
					tabBarIcon: ({ color }) => (
						<MaterialCommunityIcons name="home" color={color} size={26} />
					),
				}}
			/>
			<Tab.Screen
				name="Meal"
				component={MealScreen}
				options={{
					tabBarLabel: "Meal",
					tabBarIcon: ({ color }) => (
						<MaterialCommunityIcons name="food-apple" color={color} size={26} />
					),
				}}
			/>
			<Tab.Screen
				name="Profile"
				component={ProfileScreen}
				options={{
					tabBarLabel: "Profile",
					tabBarIcon: ({ color }) => (
						<MaterialCommunityIcons name="face" color={color} size={26} />
					),
				}}
			/>
		</Tab.Navigator>
	);
};

export default Navigation;
