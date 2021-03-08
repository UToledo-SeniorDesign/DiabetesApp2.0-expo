import React, { useState, useEffect } from "react";
import { Modal, View, Text, StyleSheet, Button } from "react-native";
import Colors from "../../constants/Colors";
import FakeMealData, { MealDetail } from "../../services/FakeMealData";
import { DataTable, Checkbox } from "react-native-paper";

const LoadMeal = (props: any) => {
	const [loadedMeals, setLoadedMeals] = useState(props.loadedMeals);
	const [page, setPage] = React.useState(0);

	const savedMeals: MealDetail[] = FakeMealData.savedMeals;
	const itemsPerPage = 10;
	const from = page * itemsPerPage;
	const to = (page + 1) * itemsPerPage;

	const onSelectHandler = (selectedMeal: MealDetail) => {
		let tempMeals = [...loadedMeals];

		for (let i = 0; i < loadedMeals.length; i++) {
			if (selectedMeal.name === loadedMeals[i].name) {
				tempMeals.splice(i, 1);
				setLoadedMeals(tempMeals);
				return;
			}
		}
		tempMeals.push(selectedMeal);
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
		<View>
			<Modal visible={props.displayModal} animationType="slide">
				<View style={styles.tableView}>
					<DataTable>
						<DataTable.Header>
							<DataTable.Title style={styles.meal}>Meal</DataTable.Title>
							<DataTable.Title style={styles.title}>Brand</DataTable.Title>
							<DataTable.Title style={styles.title}>Carbs(g)</DataTable.Title>
							<DataTable.Title style={styles.title}>Servings</DataTable.Title>
							<DataTable.Title style={styles.check}>Select</DataTable.Title>
						</DataTable.Header>
						{savedMeals.map((meal: MealDetail) => {
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
									<DataTable.Cell style={styles.title}>
										{meal.brand}
									</DataTable.Cell>
									<DataTable.Cell style={styles.title}>
										{meal.carbsPerServing}
									</DataTable.Cell>
									<DataTable.Cell style={styles.title}>
										{meal.totalServing}
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
							title="Load Meal"
							color={Colors.primary}
							onPress={onLoadMealHandler}
						/>
					</View>
					<View style={styles.button}>
						<Button title="Cancel" onPress={onCancelHandler} />
					</View>
				</View>
			</Modal>
		</View>
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
		width: "40%",
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
