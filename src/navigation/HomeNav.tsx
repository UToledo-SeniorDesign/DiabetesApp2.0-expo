/**
 * Navigation when the user is signed in
*/

import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// Screens
import HomeScreen from "../screens/HomeScreen";
import InsulinHomeScreen from "../screens/InsulinScreens/InsulinHomeScreen";
import AddMealScreen from "../screens/InsulinScreens/AddMealScreen";
import CalculateInsulinScreen from "../screens/InsulinScreens/CalculateInsulinScreen";
import HistoryScreen from "../screens/HistoryScreen";
import InfoScreen from "../screens/InfoScreen";
import ProfileScreen from "../screens/UserScreens/UserProfile";

const Tab = createMaterialBottomTabNavigator();
const HomeStack = createStackNavigator();
const InsulinStack = createStackNavigator();
const InfoStack = createStackNavigator();
const HistoryStack = createStackNavigator();
const ProfileStack = createStackNavigator();

const HomeNav:React.FC<{}> = () => {

  const HomeScreens = () => {
    return (
      <HomeStack.Navigator>
        <HomeStack.Screen name="Home" component={HomeScreen} />
      </HomeStack.Navigator>
    );
  };
  
  const InsulinScreens = () => {
    return (
      <InsulinStack.Navigator>
        <InsulinStack.Screen name="Insulin Home" component={InsulinHomeScreen} />
        <InsulinStack.Screen name="Add Meal" component={AddMealScreen} />
        <InsulinStack.Screen
          name="Calculate Insulin"
          component={CalculateInsulinScreen}
        />
      </InsulinStack.Navigator>
    );
  };
  
  const InfoScreens = () => {
    return (
      <InfoStack.Navigator>
        <InfoStack.Screen name="Info" component={InfoScreen} />
      </InfoStack.Navigator>
    );
  };
  
  const HistoryScreens = () => {
    return (
      <HistoryStack.Navigator>
        <HistoryStack.Screen name="History" component={HistoryScreen} />
      </HistoryStack.Navigator>
    );
  };
  
  const ProfileScreens = () => {
    return (
      <ProfileStack.Navigator>
        <ProfileStack.Screen name="Profile" component={ProfileScreen} />
      </ProfileStack.Navigator>
    );
  };

  return (
    <Tab.Navigator
      initialRouteName="HomeScreens"
      activeColor="black"
      barStyle={{ backgroundColor: "tomato" }}
    >
      <Tab.Screen
        name="HomeScreens"
        component={HomeScreens}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="InsulinScreens"
        component={InsulinScreens}
        options={{
          tabBarLabel: "Insulin",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="hospital" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="InfoScreens"
        component={InfoScreens}
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
        name="HistoryScreens"
        component={HistoryScreens}
        options={{
          tabBarLabel: "History",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="chart-line" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileScreens"
        component={ProfileScreens}
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

export default HomeNav;