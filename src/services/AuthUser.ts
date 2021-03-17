/**
 * This file will handle signing-up and login users.
 * Creates API request to validate whether a user exists in the DB 
 * 
*/

import type { IUser, IUserLogin } from '../types/users-types';

const DUMMY_USERS:Array<IUser> = [
    {
        first_name: 'Carlos',
        last_name: 'Galo',
        email: 'cgalo13@gmail.com',
        img: '',
        phone:''
    },
    {
        first_name: 'hello',
        last_name: 'world',
        phone:'',
        email: 'hello@world.com',
        img: ''
    },
    {
        first_name: 'Carlos',
        last_name: 'Galo',
        img: 'https://s4.anilist.co/file/anilistcdn/character/large/b66171-o2vk3689wWFK.png',
        phone: '0000000',
        email: 'cgalo@cgalo.com'
    },
    {
        first_name: 'Test',
        last_name: 'test',
        phone: '0000000',
        img: '',
        email: 'test@test.com'
    }
];

const getUser = (userEmail: string):IUser | null => {
    for (let i = 0; i < DUMMY_USERS.length; i++){
        const tempUser = DUMMY_USERS[i];
        if(tempUser.email.toLocaleLowerCase() === userEmail.toLocaleLowerCase()){
            return tempUser;
        }
    }
    return null;
}

const validateLogin = (loginUser: IUserLogin):IUser | null => {
    /**
     * Function verifies if the provided email/password is a user
     * 
     * @param loginUser, type IUserLogin, contains email and password from LoginScreen
     * @return IUser object if we found the user with the given credentials
     * @return null if we couldn't find a user with the given credentials 
    */
    
    // For now we'll just check that the user alreadys exists in the dummy users array
    return getUser(loginUser.email);
}

const validateSignUp = (newUser: IUser) => {
    /**
     * Function verifies if the user already exists in the DB
     * 
     * @param newUser is the user trying to sign up to the app
     * @return True if the user doesn't exist, therefore we sign them up
     * @return False if we the user does exists, therefore we can't sign them up
    */

    const user = getUser(newUser.email);
    console.log(user);
    if (!user){         // If the user doesn't exist, then we can sign them up
        addUser(newUser);
        return true;
    }
    return false;       // Else the signup email is already in use, return false
    
}

const addUser = (newUser: IUser):void => {
    // Here we handle the logic to the backend to signup the user
    DUMMY_USERS.push(newUser);      // For now we'll just add the user to the array
}

export {
    validateLogin,
    validateSignUp
}