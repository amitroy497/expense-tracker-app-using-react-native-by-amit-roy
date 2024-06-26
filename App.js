import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { AllExpenses, ManageExpense } from './src/screens';
import RecentExpenses from './src/screens/RecentExpenses';
import { NavigationContainer } from '@react-navigation/native';
import { GlobalStyles } from './src/constants';
import { Ionicons } from '@expo/vector-icons';
import { IconButton } from './src/components';
import { ExpensesContextProvider } from './src/store/expenses-context';

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

const ExpensesOverview = () => {
	return (
		<BottomTabs.Navigator
			screenOptions={({ navigation }) => ({
				headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
				headerTintColor: 'white',
				tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
				tabBarActiveTintColor: GlobalStyles.colors.accent500,
				headerRight: ({ tintColor }) => (
					<IconButton
						icon='add'
						size={24}
						color={tintColor}
						onPress={() => {
							navigation.navigate('ManageExpense');
						}}
					/>
				),
			})}
		>
			<BottomTabs.Screen
				name='RecentExpenses'
				component={RecentExpenses}
				options={{
					title: 'Recent Expenses',
					tabBarLabel: 'Recent',
					tabBarIcon: ({ color, size }) => (
						<Ionicons name='hourglass' color={color} size={size} />
					),
				}}
			/>
			<BottomTabs.Screen
				name='AllExpenses'
				component={AllExpenses}
				options={{
					title: 'All Expenses',
					tabBarLabel: 'All Expenses',
					tabBarIcon: ({ color, size }) => (
						<Ionicons name='calendar' color={color} size={size} />
					),
				}}
			/>
		</BottomTabs.Navigator>
	);
};

export default function App() {
	return (
		<>
			<StatusBar style='light' />
			<ExpensesContextProvider>
				<NavigationContainer>
					<Stack.Navigator
						screenOptions={{
							headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
							headerTintColor: 'white',
						}}
					>
						<Stack.Screen
							name='ExpensesOverview'
							component={ExpensesOverview}
							options={{ headerShown: false }}
						/>
						<Stack.Screen
							name='ManageExpense'
							component={ManageExpense}
							options={{
								presentation: 'modal',
							}}
						/>
					</Stack.Navigator>
				</NavigationContainer>
			</ExpensesContextProvider>
		</>
	);
}
