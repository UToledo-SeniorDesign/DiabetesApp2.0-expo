import React, { useContext, useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { Dialog, Paragraph, Portal } from 'react-native-paper';
import { Formik, FormikProps } from 'formik';

import Input from '../../components/UIElements/Input';
import Button from '../../components/UIElements/Button';
import Spinner from '../../components/UIElements/Spinner';

import AuthContext from '../../util/context/auth-context'
import { SignUpSchema } from '../../util/schema/form-schemas';
import { validateSignUp } from '../../services/auth-service';
import type { IUser, AuthUser } from '../../types/users-types';

interface FormValues extends IUser {
    // Required data to sign up a user
    password: string;
    confirmPassword: string;
    confirmEmail: string;
}

const SignUpScreen:React.FC<{}> = (prop) => {
    const auth = useContext(AuthContext);
    const [showDialog, setShowDialog] = useState(false);
    const [dialogError, setDialogError] = useState('');
    const [isLoading, setIsLoading] = useState(false);


    const submitHandler = async(values: FormValues) => {
        const newUser:IUser = {
            first_name: values.first_name,
            last_name: values.last_name,
            email: values.email
        }
        // Now lets create the user, we either get an error message or the user from the backend
        const res:string | AuthUser = await validateSignUp(newUser, values.password);  
        setIsLoading(false);                    // We are done with the request, aka done loading
        if (typeof(res) === 'string'){
            // We get here if we got an error message back
            displayDialog(res);
        } else{
            // We get here if we got the newly created user from the backend
            auth.login(res);
        }
    }

    const dismissDialog = ():void => {
        setShowDialog(false);
        setDialogError('');
    }

    const displayDialog = (errMsg: string):void => {
        setDialogError(errMsg);
        setShowDialog(true);
    }

    return(
        <SafeAreaView>
            {isLoading && 
                <View style={styles.loading}>
                    <Spinner />
                </View>
            }
            {!isLoading &&
                <><Portal>
                    <Dialog
                        visible={showDialog}
                        onDismiss={dismissDialog}
                    >
                        <Dialog.Title>SignUp Fail</Dialog.Title>
                        <Dialog.Content><Paragraph>{dialogError}</Paragraph></Dialog.Content>
                        <Dialog.Actions>
                            <Button
                                onPress={dismissDialog}
                                text="Ok"
                            />
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
                    <Formik
                        initialValues={{
                            first_name: '',
                            last_name: '',
                            email: '',
                            confirmEmail: '',
                            password: '',
                            confirmPassword: ''
                        } as FormValues}
                        validationSchema={SignUpSchema}
                        onSubmit={async (values) => {
                            setIsLoading(true);
                            await submitHandler(values);
                        } }
                    >
                        {(formikProp: FormikProps<FormValues>) => (
                            <React.Fragment>
                                <Input
                                    label="First Name"
                                    onInput={formikProp.handleChange('first_name')}
                                    error={(formikProp.errors.first_name && formikProp.touched.first_name) ? true : false}
                                    errorMsg={formikProp.errors.first_name}
                                    contentType="givenName"
                                    autoCompleteType="name" />
                                <Input
                                    label="Last Name"
                                    onInput={formikProp.handleChange('last_name')}
                                    error={(formikProp.errors.last_name && formikProp.touched.last_name) ? true : false}
                                    errorMsg={formikProp.errors.last_name}
                                    contentType="familyName"
                                    autoCompleteType="name" />
                                <Input
                                    label="Email"
                                    error={(formikProp.errors.email && formikProp.touched.email) ? true : false}
                                    errorMsg={formikProp.errors.email}
                                    onInput={formikProp.handleChange('email')}
                                    keyboardType="email-address"
                                    contentType="emailAddress"
                                    autoCompleteType="email" />
                                <Input
                                    label="Confirm Email"
                                    error={(formikProp.errors.confirmEmail && formikProp.touched.confirmEmail) ? true : false}
                                    errorMsg={formikProp.errors.confirmEmail}
                                    onInput={formikProp.handleChange('confirmEmail')}
                                    keyboardType="email-address"
                                    contentType="emailAddress"
                                    autoCompleteType="email" />
                                <Input
                                    label="Password"
                                    error={(formikProp.errors.password && formikProp.touched.password) ? true : false}
                                    errorMsg={formikProp.errors.password}
                                    onInput={formikProp.handleChange('password')}
                                    isSensitive
                                    contentType="newPassword"
                                    autoCompleteType="password" />
                                <Input
                                    label="Confirm Password"
                                    error={(formikProp.errors.confirmPassword && formikProp.touched.confirmPassword) ? true : false}
                                    errorMsg={formikProp.errors.confirmPassword}
                                    onInput={formikProp.handleChange('confirmPassword')}
                                    isSensitive
                                    contentType="newPassword"
                                    autoCompleteType="password" />

                                <Button
                                    onPress={formikProp.handleSubmit}
                                    text="Submit"
                                />
                            </React.Fragment>
                        )}
                    </Formik></>
            }
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default SignUpScreen;