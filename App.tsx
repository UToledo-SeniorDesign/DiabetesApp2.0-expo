import React, { useCallback, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Portal } from 'react-native-paper';

import RootNavigation from "./src/navigation/Navigation";
import AuthContext from './src/util/context/auth-context';
import type { AuthUser } from "./src/types/users-types";

const App:React.FC<{}> = () => {
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
	const [loggedUser, setLoggedUser] = useState<AuthUser>({} as AuthUser);

	const login = useCallback((user: AuthUser) => {
		setIsLoggedIn(true);
		setLoggedUser(user);
		
	}, []);

	const logout = useCallback(() => {
		setIsLoggedIn(false);
		setLoggedUser({} as AuthUser);
	  }, []);

	return (
		<AuthContext.Provider
			value={{
				isLoggedIn: isLoggedIn,
				login: login,
				logout: logout,
				loggedUser: loggedUser
			}}
		>
      <Portal.Host>
        <NavigationContainer>
          <RootNavigation />
        </NavigationContainer>
      </Portal.Host>
		</AuthContext.Provider>
	);
}

export default App;