import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import InsulinNavigation from "./InsulinNavigation";
import ProfileNavigation from "./ProfileNavigation";
import HomeNavigation from "./HomeNavigation";
import InfoNavigation from "./InfoNavigation";
import HistoryNavigation from "./HistoryNavigation";

const Tab = createMaterialBottomTabNavigator();

const RootNavigation = () => {
	return (
		<Tab.Navigator
			initialRouteName="HomeScreen"
			activeColor="black"
			barStyle={{ backgroundColor: "tomato" }}
		>
			<Tab.Screen
				name="HomeScreen"
				component={HomeNavigation}
				options={{
					tabBarLabel: "Home",
					tabBarIcon: ({ color }) => (
						<MaterialCommunityIcons name="home" color={color} size={26} />
					),
				}}
			/>
			<Tab.Screen
				name="InsulinScreen"
				component={InsulinNavigation}
				options={{
					tabBarLabel: "Insulin",
					tabBarIcon: ({ color }) => (
						<MaterialCommunityIcons name="hospital" color={color} size={26} />
					),
				}}
			/>
			<Tab.Screen
				name="InfoScreen"
				component={InfoNavigation}
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
				name="HistoryScreen"
				component={HistoryNavigation}
				options={{
					tabBarLabel: "History",
					tabBarIcon: ({ color }) => (
						<MaterialCommunityIcons name="chart-line" color={color} size={26} />
					),
				}}
			/>
			<Tab.Screen
				name="ProfileScreen"
				component={ProfileNavigation}
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

export default RootNavigation;
