import { useContext, useEffect, useState } from 'react';
import { ErrorOverlay, ExpensesOutput, LoadingOverlay } from '../components';
import { getDateMinusDays } from '../util/date';
import { ExpensesContext } from '../store/expenses-context';
import { fetchExpenses } from '../util/http';

export default function RecentExpenses() {
	const [isFetching, setIsFectching] = useState(true);
	const [error, setError] = useState();

	const expensesCtx = useContext(ExpensesContext);

	useEffect(() => {
		const getExpenses = async () => {
			setIsFectching(true);
			try {
				const expenses = await fetchExpenses();
				expensesCtx.setExpenses(expenses);
			} catch (error) {
				setError('Could not fetch expenses!');
			}
			setIsFectching(false);
		};

		getExpenses();
	}, [fetchExpenses]);

	const recentExpenses = expensesCtx.expenses.filter((expense) => {
		const today = new Date();
		const date7DaysAgo = getDateMinusDays(today, 7);

		return expense.date >= date7DaysAgo && expense.date <= today;
	});

	const errorHandler = () => {
		setError(null);
	};

	if (error && !isFetching) {
		return <ErrorOverlay message={error} onConfirm={errorHandler} />;
	}
	if (isFetching) {
		return <LoadingOverlay />;
	}

	return (
		<ExpensesOutput
			expenses={recentExpenses}
			expensesPeriod='Last 7 Days'
			fallbackText='No expenses registered for the last 7 days.'
		/>
	);
}
