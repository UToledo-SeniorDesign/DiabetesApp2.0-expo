import React, { useContext, useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import { 
    Button, 
    Dialog, 
    Paragraph, 
    Portal
} from 'react-native-paper';
import { Formik, FormikProps } from 'formik';

import Input from '../../components/FormElements/Input';
import { validateSignUp } from '../../services/AuthUser';
import AuthContext from '../../util/context/auth-context'
import { SignUpSchema } from '../../util/schema/form-schemas';
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
        setIsLoading(true);
        const newUser:IUser = {
            first_name: values.first_name,
            last_name: values.last_name,
            email: values.email
        }
        // Now lets create the user, we either get an error message or the user from the backend
        const res:string | AuthUser = await validateSignUp(newUser, values.password);  

        if (typeof(res) === 'string'){
            // We get here if we got an error message back
            displayDialog(res);
        } else{
            // We get here if we got the newly created user from the backend
            auth.login(res);
        }
        setIsLoading(false);
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
            <Portal>
                <Dialog
                    visible={showDialog}
                    onDismiss={dismissDialog}
                >
                     <Dialog.Title>SignUp Fail</Dialog.Title>
                     <Dialog.Content><Paragraph>{dialogError}</Paragraph></Dialog.Content>
                     <Dialog.Actions>
                         <Button
                            mode="contained"
                            onPress={dismissDialog}
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
                        confirmPassword: ''
                    } as FormValues
                }
                validationSchema={SignUpSchema}
                onSubmit={async(values) => {
                    await submitHandler(values);
                }}
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