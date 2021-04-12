import React from 'react'
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { Formik, FormikHelpers, FormikProps } from 'formik';

import Button from '../../components/UIElements/Button';
import Input from '../../components/UIElements/Input';
import { AddFoodItemSchema } from '../../util/schema/form-schemas'
import type { IFoodItem } from '../../types/meal-types';

interface CreateFoodItemProps{
    onCreatedFood: (createdFood: IFoodItem, actions: FormikHelpers<IFoodItem>) => void;
}

const CreateFoodItem:React.FC<CreateFoodItemProps> = (props) => {

    const submitHandler = (formValues: IFoodItem, actions: FormikHelpers<IFoodItem>):void => {
        const foodItem = formValues;
        foodItem.servingCarbs = Number(foodItem.servingCarbs);
        foodItem.totServings = Number(foodItem.totServings);
        props.onCreatedFood(foodItem, actions);
    }

    return(
        <SafeAreaView>
            <Formik
                validationSchema={AddFoodItemSchema}
                initialValues={{
                    foodName:'',
                    foodBrand: '',
                    servingCarbs: 0,
                    totServings: 0,
                } as IFoodItem }
                onSubmit={(values, actions) => submitHandler(values, actions)}
            >
                {(formikProps: FormikProps<IFoodItem>) => (
                    <View style={styles.inputForm}>
                        <Input
                            label="Food Name"
                            onInput={formikProps.handleChange('foodName')}
                            error={
                                (formikProps.errors.foodName && formikProps.touched.foodName)? true : false
                            }
                            errorMsg={formikProps.errors.foodName}
                            keyboardType='default'
                            contentType='none'
                            value={formikProps.values.foodName}
                        />
                        <Input
                            label="Food Brand"
                            onInput={formikProps.handleChange('foodBrand')}
                            error={
                                (formikProps.errors.foodBrand && formikProps.touched.foodBrand)? true : false
                            }
                            errorMsg={formikProps.errors.foodBrand}
                            keyboardType='default'
                            contentType='none'
                            value={formikProps.values.foodBrand}
                        />
                        <Input
                            label="Carbs per Serving"
                            onInput={formikProps.handleChange('servingCarbs')}
                            error={
                                (formikProps.errors.servingCarbs && formikProps.touched.servingCarbs)? true : false
                            }
                            errorMsg={formikProps.errors.servingCarbs}
                            keyboardType='numeric'
                            contentType='none'
                            value={formikProps.values.servingCarbs.toString()}
                        />
                        <Input
                            label="Total Servings"
                            onInput={formikProps.handleChange('totServings')}
                            error={
                                (formikProps.errors.totServings && formikProps.touched.totServings)? true : false
                            }
                            errorMsg={formikProps.errors.totServings}
                            keyboardType='numeric'
                            contentType='none'
                            value={formikProps.values.totServings.toString()}
                        />
                        <View style={styles.buttonContainer}>
                            <View style={styles.button}>
                                <Button 
                                    text="Add Food"
                                    onPress={formikProps.handleSubmit}
                                />
                            </View>
                        </View>
                    </View>
                )}
            </Formik>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
	inputForm: {
		flex: 3,
		width: "100%",
	},
	inputContainer: {
		marginVertical: 20,
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center",
	},
	buttonContainer: {
		flex: 1,
		padding: 20,
		marginTop: 30,
		width: "100%",
		flexDirection: "row",
		alignItems: "baseline",
		justifyContent: "space-around",
	},
	button: {
		width: "40%",
	},
});

export default CreateFoodItem;