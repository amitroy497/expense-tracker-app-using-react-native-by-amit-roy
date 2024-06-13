import { useContext, useLayoutEffect } from 'react';
import { GlobalStyles } from '../constants';
import { Button, ExpenseForm, IconButton } from '../components';
import { StyleSheet, View } from 'react-native';
import { ExpensesContext } from '../store/expenses-context';

export const ManageExpense = ({ route, navigation }) => {
	const expensesCtx = useContext(ExpensesContext);
	const editedExpenseId = route.params?.expenseId;
	const isEditing = !!editedExpenseId; //Convert to boolean

	const selectedExpense = expensesCtx.expenses.find(
		(expense) => expense?.id === editedExpenseId
	);

	useLayoutEffect(() => {
		navigation.setOptions({
			title: isEditing ? 'Edit Expense' : 'Add Expense',
		});
	}, [isEditing, navigation]);

	const deleteExpenseHandler = () => {
		navigation.goBack();
		expensesCtx.deleteExpense(editedExpenseId);
	};

	const cancelHandler = () => {
		navigation.goBack();
	};

	const confirmHandler = (expenseData) => {
		if (isEditing) {
			expensesCtx.updateExpense(editedExpenseId, expenseData);
		} else {
			expensesCtx.addExpense(expenseData);
		}
		navigation.goBack();
	};

	return (
		<View style={styles.container}>
			<ExpenseForm
				defaultValues={selectedExpense}
				onCancel={cancelHandler}
				onSubmit={confirmHandler}
				submitButtonLabel={isEditing ? 'Update' : 'Add'}
			/>
			{isEditing && (
				<View style={styles.deleteContainer}>
					<IconButton
						icon='trash'
						color={GlobalStyles.colors.error500}
						size={36}
						onPress={deleteExpenseHandler}
					/>
				</View>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 24,
		backgroundColor: GlobalStyles.colors.primary800,
	},
	deleteContainer: {
		marginTop: 16,
		paddingTop: 8,
		borderTopWidth: 2,
		borderTopColor: GlobalStyles.colors.primary200,
		alignItems: 'center',
	},
});
