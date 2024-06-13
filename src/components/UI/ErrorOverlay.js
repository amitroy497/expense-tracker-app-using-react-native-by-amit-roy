import { StyleSheet, Text, View } from 'react-native';
import { Button } from './Button';
import { GlobalStyles } from '../../constants';

export const ErrorOverlay = ({ message, onConfirm }) => {
	return (
		<View style={styles.container}>
			<Text style={[styles.text, styles.title]}>An error occured!</Text>
			<Text style={styles.text}>{message}</Text>
			<Button onPress={onConfirm}>OK</Button>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 24,
		backgroundColor: GlobalStyles.colors.primary700,
	},
	text: {
		color: 'white',
		textAlign: 'center',
		marginBottom: 8,
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold',
	},
});
