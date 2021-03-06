import React from 'react';
import { IUser } from '../types';

interface AuthProp {
    isLogingMode: boolean;              // Display logging or signup form
}

const Auth:React.FC<IUser> = (props) => {

    return (
        <div className="auth-page">
            <h1>Auth page!</h1>
        </div>
    );
}

export default Auth;