/**
 * Navigation for when the user is not logged into the app
*/

import React from 'react';
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import LoginScreen from '../screens/UserScreens/LoginScreen';
import SignUpScreen from '../screens/UserScreens/SignUpScreen';

const AuthNav:React.FC<{}> = () => {
    const Tab = createMaterialBottomTabNavigator();
    const LoginStack = createStackNavigator();
    const SignUpStack = createStackNavigator();

    const loginScreen = () => {
        return (
            <LoginStack.Navigator>
                <LoginStack.Screen 
                    name="Login" 
                    component={LoginScreen} 
                />
            </LoginStack.Navigator>
        );
    };

    const signUpScreen = () => {
        return (
            <SignUpStack.Navigator>
                <SignUpStack.Screen 
                    name="Sign Up"
                    component={SignUpScreen}
                />
            </SignUpStack.Navigator>
        );
    };
    
    return(
        <Tab.Navigator
            initialRouteName="Login Screen"
            activeColor="black"
            barStyle={{ backgroundColor: "tomato" }}
        >
            <Tab.Screen 
                name="Login Screen"
                component={loginScreen}
                options={{
                    tabBarLabel: "Login",
                    tabBarIcon: ({color}) => (
                        <MaterialCommunityIcons 
                            name="login"
                            color={color}
                            size={26}
                        />
                    )
                }}
            />
            <Tab.Screen 
                name="SignUp Screen"
                component={signUpScreen}
                options={{
                    tabBarLabel: "Sign Up",
                    tabBarIcon: ({color}) => (
                        <MaterialCommunityIcons 
                            name="account-plus"
                            color={color}
                            size={26}
                        />
                    )
                }}
            />
        </Tab.Navigator>
    );
}

export default AuthNav;