import React, { useContext, useState } from 'react';
import { SafeAreaView, View } from 'react-native';
import { Button } from 'react-native-paper';
import { Formik, FormikProps } from 'formik';
import * as yup from 'yup';

import Input from '../../components/FormElements/Input';
import { IUser } from '../../types/users-types';
import AuthContext from '../../util/context/auth-context';

const USER:IUser = {
    first_name: 'Carlos',
    last_name: 'Galo',
    img: 'https://s4.anilist.co/file/anilistcdn/character/large/b66171-o2vk3689wWFK.png',
    phone: '0000000',
    email: 'cgalo@cgalo.com'
}

interface FormValues {
    email: string;
    password: string;
}

const validationSchema = yup.object().shape({
    email: yup.string().label('Email').email().required('Email is required'),
    password: yup
        .string()
        .label('Password')
        .required('Password is reqired')
        .min(6, 'Password must be at least 6 characters long.')
        
});

const LoginScreen:React.FC<{}> = () => {
    const auth =  useContext(AuthContext);

    const onSubmitHandler = (values: FormValues) => {
        alert(JSON.stringify(values));
        auth.login(USER);
    }

    
    const isEmailValid = (email: string | undefined): boolean => {
        return (email ? true: false)
    }
    return(
        <SafeAreaView style={{ marginTop: 90}}>
            <Formik
                initialValues={{email:'', password: ''} as FormValues}
                onSubmit={(values) => {
                    auth.login(USER);
                }}
                validationSchema={validationSchema}
            >
                {(formikProp: FormikProps<FormValues>) => (
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