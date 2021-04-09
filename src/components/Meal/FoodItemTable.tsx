import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { DataTable } from 'react-native-paper';

import type { IFoodItem } from '../../types/meal-types';

interface FoodItemTableProps{
    foodItems: IFoodItem[];
}

const FoodItemTable:React.FC<FoodItemTableProps> = (props) => {

    const rows = props.foodItems.map((food: IFoodItem) => {
        return (
            <DataTable.Row key={food.foodName}>
                <DataTable.Cell style={styles.foodName}>
                    {food.foodName}
                </DataTable.Cell>
                <DataTable.Cell style={styles.title}>
                    {food.servingCarbs}
                </DataTable.Cell>
                <DataTable.Cell style={styles.title}>
                    {food.totServings}
                </DataTable.Cell>
            </DataTable.Row>
        );
    })
    return (
        <SafeAreaView>
            <View style={styles.tableView}>
                <DataTable.Header>
                    <DataTable.Title style={styles.foodName}>Food Item</DataTable.Title>
                    <DataTable.Title style={styles.title}>Carbs(g)</DataTable.Title>
                    <DataTable.Title style={styles.title}>Servings</DataTable.Title>
                </DataTable.Header>
                {rows}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
	tableView: {
		flex: 7,
		alignItems: "stretch",
	},
	screen: {
		flex: 1,
	},
	title: {
		flex: 3,
		justifyContent: "center",
	},
	foodName: {
		flex: 5,
	},
});

export default FoodItemTable;