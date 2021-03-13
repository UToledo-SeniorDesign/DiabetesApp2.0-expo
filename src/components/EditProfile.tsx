import React from 'react';
import {
    SafeAreaView
} from 'react-native';


import type { IUser } from '../types';

interface EditProfileProp {
    loggedUser: IUser;              // User currently signed in the app
}

const EditProfile:React.FC<EditProfileProp> = (prop) => {
    return(
        <SafeAreaView>
            
        </SafeAreaView>
    );
}

export default EditProfile