import React, { useContext, useState } from 'react';
import { SafeAreaView } from 'react-native';
import { Button, Dialog, Portal, Paragraph } from 'react-native-paper';
import { Formik, FormikProps } from 'formik';

import Input from '../../components/FormElements/Input';
import AuthContext from '../../util/context/auth-context';
import { validateLogin } from '../../services/AuthUser';
import { LoginSchema } from '../../util/schema/form-schemas';
import { IUser, IUserLogin } from '../../types/users-types';

const LoginScreen:React.FC<{}> = () => {
    const auth =  useContext(AuthContext);
    const [showErrorDialog, setShowErrorDialog] = useState(false);

    const submitHandler = (values: IUserLogin):void => {
        const response: IUser | null = validateLogin(values);
        alert(JSON.stringify(values));      // Display the values entered
        if (response){                      // If we got an actual IUser
            auth.login(response);           // Then login the user we got back
        }
        else {                              // Else we couldn't login the user
            setShowErrorDialog(true);       // Display error dialog to the user
        }
    }

    return(
        <React.Fragment>
            {/* Portal allows the Dialog to be on top of the actual form section */}
            <Portal>
                <Dialog
                    visible={showErrorDialog}
                    onDismiss={() => setShowErrorDialog(false)}
                >
                     <Dialog.Title>Login Fail</Dialog.Title>
                     <Dialog.Content><Paragraph>Incorrect email or password</Paragraph></Dialog.Content>
                     <Dialog.Actions>
                         <Button
                            mode="contained"
                            onPress={() => setShowErrorDialog(false)}
                         >
                             Ok
                        </Button>
                     </Dialog.Actions>
                </Dialog>
            </Portal>
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