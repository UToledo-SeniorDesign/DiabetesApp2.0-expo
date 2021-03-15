import React, { useCallback, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";

import RootNavigation from "./src/navigation/RootNavigation";
import AuthContext from './src/util/context/auth-context';
import type { IUser } from "./src/types/users-types";
import LoginScreen from "./src/screens/UserScreens/LoginScreen";
import { SafeAreaView, View } from "react-native";

export default function App() {
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
	const [loggedUser, setLoggedUser] = useState<IUser>({} as IUser);

	const login = useCallback((user: IUser) => {
		setLoggedUser(user);
		setIsLoggedIn(true);
	}, []);

	const logout = useCallback(() => {
		setIsLoggedIn(false);
		setLoggedUser({} as IUser);
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
			  <SafeAreaView>
				  <LoginScreen />
			  </SafeAreaView>
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
