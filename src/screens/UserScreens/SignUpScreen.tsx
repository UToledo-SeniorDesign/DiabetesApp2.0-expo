import React, { useContext, useState } from 'react';
import { SafeAreaView, View } from 'react-native';
import { Button, Dialog, Paragraph, Portal } from 'react-native-paper';
import { Formik, FormikProps } from 'formik';

import Input from '../../components/FormElements/Input';
import { validateSignUp } from '../../services/AuthUser';
import AuthContext from '../../util/context/auth-context'
import { SignUpSchema } from '../../util/schema/form-schemas';
import type { IUser } from '../../types/users-types';

interface FormValues extends IUser {
    // Required data to sign up a user
    password: string;
    confirmPassword: string;
    confirmEmail: string;
}

const SignUpScreen:React.FC<{}> = (prop) => {
    const auth = useContext(AuthContext);
    const [showErrorDialog, setShowErrorDialog] = useState(false);

    const submitHandler = (values: FormValues):void => {
        const newUser:IUser = {
            first_name: values.first_name,
            last_name: values.last_name,
            email: values.email,
            phone: '',
            img: 
                'https://s4.anilist.co/file/anilistcdn/staff/large/n119917-mfjX9nNByZk3.jpg'
        }

        const isValid = validateSignUp(newUser);
        if (isValid){
            // User is valid to signup and has be done in the backend, we sign-him in the app
            auth.login(newUser);
        }
        else{
            // We get here if we couldn't signup the user
            setShowErrorDialog(true);
        }
    }

    return(
        <SafeAreaView>
            <Portal>
                <Dialog
                    visible={showErrorDialog}
                    onDismiss={() => setShowErrorDialog(false)}
                >
                     <Dialog.Title>Email already in use</Dialog.Title>
                     <Dialog.Content><Paragraph>Try switch to sign in</Paragraph></Dialog.Content>
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
            <Formik
                initialValues={
                    {
                        first_name: '',
                        last_name: '',
                        email: '',
                        confirmEmail: '',
                        password: '',
                        confirmPassword: '',
                        img: ''
                    } as FormValues
                }
                validationSchema={SignUpSchema}
                onSubmit={submitHandler}
            >
                {(formikProp: FormikProps<FormValues>)=>(
                    <React.Fragment>
                        <Input 
                            label="First Name"
                            onInput={formikProp.handleChange('first_name')}
                            error={
                                (formikProp.errors.first_name && formikProp.touched.first_name) ? true: false
                            }
                            errorMsg={formikProp.errors.first_name}
                            contentType="givenName"
                            autoCompleteType="name"
                        />
                        <Input 
                            label="Last Name"
                            onInput={formikProp.handleChange('last_name')}
                            error={
                                (formikProp.errors.last_name && formikProp.touched.last_name) ? true: false
                            }
                            errorMsg={formikProp.errors.last_name}
                            contentType="familyName"
                            autoCompleteType="name"
                        />
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
                            label="Confirm Email"
                            error={
                                (formikProp.errors.confirmEmail && formikProp.touched.confirmEmail) ? true: false
                            }
                            errorMsg={formikProp.errors.confirmEmail}
                            onInput={formikProp.handleChange('confirmEmail')}
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
                            contentType="newPassword"
                            autoCompleteType="password"
                        />
                        <Input 
                            label="Confirm Password"
                            error={
                                (formikProp.errors.confirmPassword && formikProp.touched.confirmPassword) ? true: false
                            }
                            errorMsg={formikProp.errors.confirmPassword}
                            onInput={formikProp.handleChange('confirmPassword')}
                            isSensitive
                            contentType="newPassword"
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

export default SignUpScreen;