import React from 'react';
import {
    SafeAreaView
} from 'react-native';

import Input from '../../components/FormElements/Input';
import type { IUser } from '../../types/users-types';

interface EditProfileProp {
    loggedUser: IUser;              // User currently signed in the app
}

const EditProfile:React.FC<EditProfileProp> = (prop) => {
    const inputHander = (val: string) => {
        
    }

    return(
        <SafeAreaView>
            <Input 
                onInput={inputHander}
                label="Email"
                error={true}
            />
        </SafeAreaView>
    );
}

export default EditProfile