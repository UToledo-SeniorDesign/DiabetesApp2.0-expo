import React, { useCallback, useState } from "react";
import { SafeAreaView, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Button, Portal } from 'react-native-paper';

// Screens & Navigation
import LoginScreen from "./src/screens/UserScreens/LoginScreen";
import SignUpScreen from "./src/screens/UserScreens/SignUpScreen";
import RootNavigation from "./src/navigation/RootNavigation";

// Util 
import AuthContext from './src/util/context/auth-context';
import type { AuthUser } from "./src/types/users-types";

export default function App() {
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
	const [loggedUser, setLoggedUser] = useState<AuthUser>({} as AuthUser);
	const [isLoginMode, setIsLoginMode] = useState<boolean>(true);

	const login = useCallback((user: AuthUser) => {
		setIsLoggedIn(true);
		setLoggedUser(user);
		
	}, []);

	const logout = useCallback(() => {
		setIsLoggedIn(false);
		setLoggedUser({} as AuthUser);
	  }, [])

	  let route;

	  if (isLoggedIn){
		route = (
			<NavigationContainer>
				<RootNavigation />
			</NavigationContainer>
		);
	  } else{
		  route = (
			  <Portal.Host>
				  <SafeAreaView>
					{isLoginMode && 
						<LoginScreen />
					}
					{!isLoginMode && 
						<SignUpScreen/>
					}
					<Button
						mode="outlined"
						onPress={() => setIsLoginMode(!isLoginMode)}
					>
						{isLoginMode && "SWITCH TO SIGNUP"}
						{!isLoginMode && "SWITCH TO LOGIN"}
					</Button>
				</SafeAreaView>
			  </Portal.Host>
				
		  )
	  }

	return (
		<AuthContext.Provider
			value={{
				isLoggedIn: isLoggedIn,
				login: login,
				logout: logout,
				loggedUser: loggedUser
			}}
		>
			{route}
		</AuthContext.Provider>
	);
}
