import React, { useContext, useState } from 'react';
import { SafeAreaView } from 'react-native';
import { Button, Dialog, Portal, Paragraph } from 'react-native-paper';
import { Formik, FormikProps } from 'formik';

import Input from '../../components/FormElements/Input';
import AuthContext from '../../util/context/auth-context';
import { validateLogin } from '../../services/AuthUser';
import { LoginSchema } from '../../util/schema/form-schemas';
import { IUserLogin, AuthUser } from '../../types/users-types';

const LoginScreen:React.FC<{}> = () => {
    const auth =  useContext(AuthContext);
    const [showError, setShowError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

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
        if (typeof(response) === 'string'){
            // We got an error message
            showErrorDialog(response);
        } else{
            // We got the created user from the backend
            auth.login(response)
        }
    }

    return(
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
                            mode="contained"
                            onPress={() => setShowError(false)}
                         >
                             Ok
                        </Button>
                     </Dialog.Actions>
                </Dialog>
            </Portal>
            <SafeAreaView style={{ marginTop: 90}}>
                <Formik
                    initialValues={{email:'', password: ''} as IUserLogin}
                    onSubmit={ async (values) => {
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
                                mode="contained"
                            >
                                Submit
                            </Button>
                        </React.Fragment>
                    )}
                </Formik>
            </SafeAreaView>
        </React.Fragment>
    );
}

export default LoginScreen;