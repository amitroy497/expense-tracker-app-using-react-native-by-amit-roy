import { useContext, useLayoutEffect, useState } from 'react';
import { GlobalStyles } from '../constants';
import {
	ErrorOverlay,
	ExpenseForm,
	IconButton,
	LoadingOverlay,
} from '../components';
import { StyleSheet, View } from 'react-native';
import { ExpensesContext } from '../store/expenses-context';
import { deleteExpense, storeExpense, updateExpense } from '../util/http';

export const ManageExpense = ({ route, navigation }) => {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState();

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

	const deleteExpenseHandler = async () => {
		setIsSubmitting(true);
		try {
			await deleteExpense(editedExpenseId);
			expensesCtx.deleteExpense(editedExpenseId);
			navigation.goBack();
		} catch (error) {
			setError('Could not delete expense - please try again later!');
			setIsSubmitting(false);
		}
	};

	const cancelHandler = () => {
		navigation.goBack();
	};

	const confirmHandler = async (expenseData) => {
		setIsSubmitting(true);
		try {
			if (isEditing) {
				expensesCtx.updateExpense(editedExpenseId, expenseData);
				await updateExpense(editedExpenseId, expenseData);
			} else {
				const id = await storeExpense(expenseData);
				expensesCtx.addExpense({ ...expenseData, id: id });
			}
			navigation.goBack();
		} catch (error) {
			setError('Could not save data - please try again later!');
			setIsSubmitting(false);
		}
	};

	const errorHandler = () => {
		setError(null);
	};

	if (error && !isSubmitting) {
		return <ErrorOverlay message={error} onConfirm={errorHandler} />;
	}
	if (isSubmitting) {
		return <LoadingOverlay />;
	}

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
