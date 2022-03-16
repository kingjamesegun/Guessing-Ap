import React, { useState } from 'react';
import {
	View,
	Text,
	StyleSheet,
	Button,
	TouchableWithoutFeedback,
	Keyboard,
	Alert,
} from 'react-native';
import Card from '../components/Card';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';
import Colors from '../constants/colors';
import BodyText from "../components/BodyText";
import MainButton from "../components/MainButton";

const StartGameScreen = (props) => {
	const [enteredValue, setEnteredValue] = useState('');
	const [confirmed, setConfirmed] = useState(false);
	const [selectedNumber, setSelectedNumber] = useState('');

	const numberInputHandler = (inputText) => {
		setEnteredValue(inputText.replace(/[^0-9]/g, ''));
	};

	const resetInputHandler = () => {
		setEnteredValue('');
		setConfirmed(false);
	};

	const confirmInputHandler = () => {
		const chosenNumber = parseInt(enteredValue);
		if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
			Alert.alert(
				'Invalid number!',
				'Number has to be a number between 1 and 99.',
				[{ text: 'Okay', style: 'destructive', onPress: resetInputHandler }]
			);
			return;
		}
		setConfirmed(true);
		setSelectedNumber(chosenNumber);
		setEnteredValue('');
		Keyboard.dismiss();
	};

	let confirmedOutput;

	if (confirmed) {
		confirmedOutput = (
			<Card style={styles.confirmedSummary}>
				<Text>You Selected</Text>
				<NumberContainer>{selectedNumber}</NumberContainer>
				<MainButton
					onPress={() => props.onStartGame(selectedNumber)}
				>Start Game</MainButton>
			</Card>
		);
	}
	return (
		<TouchableWithoutFeedback
			onPress={() => {
				Keyboard.dismiss();
			}}
		>
			<View style={styles.screen}>
				<Text style={styles.title}>Start a new Game</Text>
				<Card style={styles.inputContainer}>
					<BodyText>Select a Number</BodyText>
					<Input
						style={styles.input}
						bluronSubmit
						autoCapitalize='none'
						autoCorrect={false}
						keyboardType='numeric'
						maxLength={2}
						onChangeText={numberInputHandler}
						value={enteredValue}
					/>
					<View style={styles.buttonContainer}>
						<View style={styles.buttons}>
							<Button
								title='Reset'
								onPress={resetInputHandler}
								color={Colors.accent}
							/>
						</View>
						<View style={styles.buttons}>
							<Button
								title='Confirm'
								onPress={confirmInputHandler}
								color={Colors.primary}
							/>
						</View>
					</View>
				</Card>
				{confirmedOutput}
			</View>
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		padding: 10,
		alignItems: 'center',
	},
	title: {
		fontSize: 20,
		marginVertical: 10,
		fontFamily: 'open-regular',
	},
	inputContainer: {
		width: 300,
		maxWidth: '80%',
		alignItems: 'center',
	},
	buttonContainer: {
		flexDirection: 'row',
		width: '100%',
		justifyContent: 'space-between',
		paddingHorizontal: 15,
	},
	buttons: {
		width: '40%',
	},
	input: {
		width: 50,
		textAlign: 'center',
	},
	confirmedSummary: {
		marginTop: 20,
		alignItems: 'center',
	},
});

export default StartGameScreen;
