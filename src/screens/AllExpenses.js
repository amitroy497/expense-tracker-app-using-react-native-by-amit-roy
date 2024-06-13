import { useContext } from 'react';
import { ExpensesOutput } from '../components';
import { ExpensesContext } from '../store/expenses-context';

export const AllExpenses = () => {
	const expensesCtx = useContext(ExpensesContext);
	return (
		<ExpensesOutput
			expenses={expensesCtx.expenses}
			expensesPeriod='Total'
			fallbackText='No registered expenses found.'
		/>
	);
};
