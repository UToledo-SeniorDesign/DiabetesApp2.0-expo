import React, { useContext, useState } from 'react';
import { SafeAreaView, View } from 'react-native';
import { Button } from 'react-native-paper';
import { Formik, FormikProps } from 'formik';

import Input from '../../components/FormElements/Input';
import AuthContext from '../../util/context/auth-context';
import { validateLogin } from '../../services/AuthUser';
import { LoginSchema } from '../../util/schema/form-schemas';
import { IUser, IUserLogin } from '../../types/users-types';

const LoginScreen:React.FC<{}> = () => {
    const auth =  useContext(AuthContext);

    const submitHandler = (values: IUserLogin):void => {
        alert(JSON.stringify(values));      // Display the values entered
        const response: IUser | null = validateLogin(values);
        if (response === null){
            // We don't allow them to login and display an error
            
        }
        else{
            // Response has the user values to log them in
            
            auth.login(response);
        }
    }

    return(
        <SafeAreaView style={{ marginTop: 90}}>
            <Formik
                initialValues={{email:'', password: ''} as IUserLogin}
                onSubmit={submitHandler}
                validationSchema={LoginSchema}
            >
                {(formikProp: FormikProps<IUserLogin>) => (
                    <React.Fragment>
                        <Input 
                            label="Email"
                            error={
                                (formikProp.errors.email && formikProp.touched.email) ? true: false
                            }
                            errorMsg={formikProp.errors.email}
                            onInput={formikProp.handleChange('email')}
                            keyboardType="email-address"
                            contentType="emailAddress"
                            // value={formikProp.values.email}
                            autoCompleteType="email"
                        />

                        <Input 
                            label="Password"
                            error={
                                (formikProp.errors.password && formikProp.touched.password) ? true: false
                            }
                            errorMsg={formikProp.errors.password}
                            onInput={formikProp.handleChange('password')}
                            isSensitive
                            contentType="password"
                            // value={formikProp.values.password}
                            autoCompleteType="password"
                        />
                        <Button 
                            onPress={formikProp.handleSubmit} 
                            mode="contained"
                        >
                            Submit
                        </Button>
                    </React.Fragment>
                )}

            </Formik>

        </SafeAreaView>        
    );
}

export default LoginScreen;