import React, { Component, useState } from "react";
import { StyleSheet } from "react-native";
import { DataTable, Checkbox } from "react-native-paper";

import { MealDetail } from "../../services/FakeMealData";

const SavedMealsTable = (props: any) => {
	const [page, setPage] = React.useState(0);
	const [checkList, setCheckList] = React.useState(() => {
		let checks = new Map<string, "checked" | "unchecked" | "indeterminate">();
		props.meals.forEach((meal: MealDetail) => {
			checks.set(meal.name, "unchecked");
		});
		return checks;
	});

	const itemsPerPage = 10;
	const from = page * itemsPerPage;
	const to = (page + 1) * itemsPerPage;

	const onSelectHandler = (mealName: string) => {
		const status =
			checkList.get(mealName) === "checked" ? "unchecked" : "checked";

		let checks = new Map<string, "checked" | "unchecked" | "indeterminate">(
			checkList
		);

		checks.set(mealName, status);
		setCheckList(checks);
	};

	return (
		<DataTable>
			<DataTable.Header>
				<DataTable.Title style={styles.meal}>Meal</DataTable.Title>
				<DataTable.Title style={styles.title}>Brand</DataTable.Title>
				<DataTable.Title style={styles.title}>Carbs(g)</DataTable.Title>
				<DataTable.Title style={styles.title}>Servings</DataTable.Title>
				<DataTable.Title style={styles.check}>Select</DataTable.Title>
			</DataTable.Header>
			{props.meals.map((meal: MealDetail, key: string) => {
				return (
					<DataTable.Row
						key={meal.name}
						onPress={() => {
							onSelectHandler(meal.name);
						}}
					>
						<DataTable.Cell style={styles.meal}>{meal.name}</DataTable.Cell>
						<DataTable.Cell style={styles.title}>{meal.brand}</DataTable.Cell>
						<DataTable.Cell style={styles.title}>
							{meal.carbsPerServing}
						</DataTable.Cell>
						<DataTable.Cell style={styles.title}>
							{meal.totalServing}
						</DataTable.Cell>
						<DataTable.Cell style={styles.check}>
							<Checkbox
								status={checkList.get(meal.name)!}
								onPress={() => {
									onSelectHandler(meal.name);
								}}
							/>
						</DataTable.Cell>
					</DataTable.Row>
				);
			})}
			<DataTable.Pagination
				page={page}
				numberOfPages={Math.floor(props.meals.length / itemsPerPage)}
				onPageChange={(page) => setPage(page)}
				label={`${from + 1}-${to} of ${props.meals.length}`}
			/>
		</DataTable>
	);
};

const styles = StyleSheet.create({
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

export default SavedMealsTable;
