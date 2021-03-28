/**
 * This context assits to keep track of the user who's signed in.
 * More information about context: https://reactjs.org/docs/context.html
**/

import { createContext } from 'react';

import type { AuthUser } from '../../types/users-types';

const AuthContext = createContext({
    isLoggedIn: false, 
    login: (user: AuthUser) => {}, 
    logout: () => {},
    loggedUser: {} as AuthUser
});

export default AuthContext;