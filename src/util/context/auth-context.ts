/**
 * This context assits to keep track of the user who's signed in.
 * More information about context: https://reactjs.org/docs/context.html
**/

import { createContext } from 'react';

import type { IUser } from '../../types/users-types';

const AuthContext = createContext({
    isLoggedIn: false, 
    login: (user: IUser) => {}, 
    logout: () => {},
    loggedUser: {} as IUser
});

export default AuthContext;