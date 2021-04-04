import React, { useState } from "react";
import { Modal, View, StyleSheet, SafeAreaView } from "react-native";
import Button from '../UIElements/Button';
import Colors from "../../constants/Colors";
import FakeMealData from "../../services/FakeMealData";
import { DataTable, Checkbox } from "react-native-paper";

import type { IMeal } from '../../types/meal-types';

interface LoadMealProps{
	// loadedMeals: IMeal[];
	savedMeals: IMeal[]
	onDismiss: () => void;
	onFinishLoad: (meals: IMeal[]) => void;
	displayModal: boolean;
}

const LoadMeal:React.FC<LoadMealProps> = (props) => {
	const [loadedMeals, setLoadedMeals] = useState<IMeal[]>([]);
	const [page, setPage] = useState(0);
	const [canLoadMeal, setCanLoadMeal] = useState(false);

	const { savedMeals } = props;
	const itemsPerPage = 10;
	const from = page * itemsPerPage;
	const to = (page + 1) * itemsPerPage;

	const onSelectHandler = (selectedMeal: IMeal) => {
		let tempMeals = [...loadedMeals];
		let changedList = false;

		for (let i = 0; i < loadedMeals.length; i++) {
			if (selectedMeal.name === loadedMeals[i].name) {
				tempMeals.splice(i, 1);
				setLoadedMeals(tempMeals);
				changedList = true;
				break;
			}
		}
		if (!changedList) {
			tempMeals.push(selectedMeal);
		}

		if (tempMeals.length === 0) {
			setCanLoadMeal(false);
		} else {
			setCanLoadMeal(true);
		}
		setLoadedMeals(tempMeals);
	};

	const onCancelHandler = () => {
		props.onDismiss();
	};

	const onLoadMealHandler = () => {
		props.onFinishLoad(loadedMeals);
		props.onDismiss();
	};

	const getCheckState = (mealName: string) => {
		for (let i = 0; i < loadedMeals.length; i++) {
			if (loadedMeals[i].name === mealName && loadedMeals[i]) {
				return "checked";
			}
		}
		return "unchecked";
	};

	return (
		<SafeAreaView style={styles.screen}>
			<Modal visible={props.displayModal} animationType="slide">
				<View style={styles.tableView}>
					<DataTable>
						<DataTable.Header>
							<DataTable.Title style={styles.meal}>Meal</DataTable.Title>
							{/* <DataTable.Title style={styles.title}>Brand</DataTable.Title> */}
							<DataTable.Title style={styles.title}>Carbs(g)</DataTable.Title>
							<DataTable.Title style={styles.title}>Total Foods</DataTable.Title>
							<DataTable.Title style={styles.check}>Select</DataTable.Title>
						</DataTable.Header>
						{savedMeals.map((meal: IMeal) => {
							return (
								<DataTable.Row
									key={meal.name}
									onPress={() => {
										onSelectHandler(meal);
									}}
								>
									<DataTable.Cell style={styles.meal}>
										{meal.name}
									</DataTable.Cell>
									{/* <DataTable.Cell style={styles.title}>
										{meal.brand}
									</DataTable.Cell> */}
									<DataTable.Cell style={styles.title}>
										{meal.totCarbs}
									</DataTable.Cell>
									<DataTable.Cell style={styles.title}>
										{meal.foodItems.length}
									</DataTable.Cell>
									<DataTable.Cell style={styles.check}>
										<Checkbox
											status={getCheckState(meal.name)}
											onPress={() => {
												onSelectHandler(meal);
											}}
										/>
									</DataTable.Cell>
								</DataTable.Row>
							);
						})}
						<DataTable.Pagination
							page={page}
							numberOfPages={Math.floor(savedMeals.length / itemsPerPage)}
							onPageChange={(page) => setPage(page)}
							label={`${from + 1}-${to} of ${savedMeals.length}`}
						/>
					</DataTable>
				</View>
				<View style={styles.buttonContainer}>
					<View style={styles.button}>
						<Button 
							text="Cancel" 
							onPress={onCancelHandler} 
							mode='outlined'
						/>
					</View>
					<View style={styles.button}>
						<Button
							disabled={!canLoadMeal}
							text="Load"
							onPress={onLoadMealHandler}
						/>
					</View>
				</View>
			</Modal>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	tableView: {
		flex: 7,
		alignItems: "stretch",
	},
	buttonContainer: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "flex-start",
		width: "100%",
	},
	button: {
		width: "45%",
		padding: 30,
	},
	screen: {
		flex: 1,
	},
	title: {
		flex: 3,
		justifyContent: "center",
	},
	meal: {
		flex: 5,
	},
	check: {
		flex: 2,
	},
});

export default LoadMeal;
