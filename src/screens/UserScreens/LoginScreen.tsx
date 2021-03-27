import React, { useContext, useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { Dialog, Portal, Paragraph } from 'react-native-paper';
import { Formik, FormikProps } from 'formik';

import Input from '../../components/FormElements/Input';
import Spinner from '../../components/FormElements/Spinner';
import Button from '../../components/FormElements/Button';

import AuthContext from '../../util/context/auth-context';
import { validateLogin } from '../../services/AuthUser';
import { LoginSchema } from '../../util/schema/form-schemas';
import { IUserLogin, AuthUser } from '../../types/users-types';

interface LoginScreenProp{
    switchToSignUp: () => void;
}

const LoginScreen:React.FC<LoginScreenProp> = (prop) => {
    const auth =  useContext(AuthContext);
    const [showError, setShowError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const showErrorDialog = (message: string):void => {
        /**
         * Function toggles the error dialog on with it's new error message.
         * The dialog/error is dismissed by the user!
         * @param message is the error message to display in the dialog
         */

        setErrorMsg(message);
        setShowError(true);
    }

    const submitHandler = async(values: IUserLogin) => {
        /**
         * Function sends the data to the service function to handle the request to the backend. 
         * The validateLogin returns either a string with the error message or the created user 
         * obj from the backend.
         * @param values (email/password) from the Formik/form
        */

        const response:string | AuthUser = await validateLogin(values.email, values.password);
        setIsLoading(false);                    // We are done with the request, aka done loading
        if (typeof(response) === 'string'){
            // We got an error message
            showErrorDialog(response);
        } else{
            // We got the created user from the backend
            auth.login(response)
        }
    }

    return(
        <View>
            { isLoading && 
                <View style={styels.spinner}> 
                    <Spinner />
                </View>
            }
            { !isLoading && 
                <React.Fragment>
                    {/* Portal allows the Dialog to be on top of the actual form section */}
                    <Portal>
                        <Dialog
                            visible={showError}
                            onDismiss={() => setShowError(false)}
                        >
                            <Dialog.Title>Login Fail</Dialog.Title>
                            <Dialog.Content><Paragraph>{errorMsg}</Paragraph></Dialog.Content>
                            <Dialog.Actions>
                                <Button
                                    text="Ok"
                                    onPress={() => setShowError(false)}
                                />
                            </Dialog.Actions>
                        </Dialog>
                    </Portal>
                    <SafeAreaView style={{ marginTop: 90}}>
                        <Formik
                            initialValues={{email:'', password: ''} as IUserLogin}
                            onSubmit={ async (values) => {
                                setIsLoading(true);
                                await submitHandler(values);
                            }}
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
                                        autoCompleteType="password"
                                    />
                                    <Button
                                        onPress={formikProp.handleSubmit} 
                                        text="Submit"
                                    />
                                </React.Fragment>
                            )}
                        </Formik>
                    </SafeAreaView>
                    <Button 
                        text="Switch to signup"
                        uppercase={true}
                        mode='outlined'
                        onPress={prop.switchToSignUp}
                    />
                </React.Fragment>
            }
        </View>
    );
}

const styels = StyleSheet.create({
    spinner: {
        flex: 1,
        marginTop: 240,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default LoginScreen;