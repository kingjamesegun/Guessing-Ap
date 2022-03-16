import React, { useState, useEffect, useRef } from 'react';
import {
	View,
	Text,
	StyleSheet,
	Button,
	Alertv,
	ScrollView,
} from 'react-native';
import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import MainButton from '../components/MainButton';
import { Ionicons } from '@expo/vector-icons';

const generateRandomBetween = (min, max, exclude) => {
	min = Math.ceil(min);
	max = Math.floor(max);
	const rndNum = Math.floor(Math.random() * (max - min)) + min;
	if (rndNum === exclude) {
		return generateRandomBetween(min, max, exclude);
	}
	return rndNum;
};
const GameScreen = (props) => {
	const initialState = generateRandomBetween(1, 100, userChoice);
	const { userChoice, onGameOver } = props;
	const [pastGuesses, setPastGuesses] = useState(initialState);
	const [currentGuess, setcurrentGuess] = useState(initialState);

	const currentLow = useRef(1);
	const currentHigh = useRef(100);

	useEffect(() => {
		if (currentGuess === userChoice) {
			onGameOver(rounds);
		}
	}, [currentGuess, userChoice, onGameOver]);

	const nextGuessHandler = (direction) => {
		if (
			(direction === 'lower' && currentGuess < userChoice) ||
			(direction === 'greater' && currentGuess > userChoice)
		) {
			Alert.alert("Don't Lie!", 'You know this is wrong...', [
				{ text: 'Sorry', style: 'cancel' },
			]);
			return;
		}
		if (direction === 'lower') {
			currentHigh.current = currentGuess;
		} else {
			currentLow.current = currentGuess + 1;
		}
		const nextNumber = generateRandomBetween(
			currentLow.current,
			currentHigh.current,
			currentGuess
		);

		setcurrentGuess(nextNumber);
		// setRounds((curRounds) => curRounds + 1);
		setPastGuesses((curPastGuesses) => [nextNumber, ...curPastGuesses]);
	};

	return (
		<View style={styles.screen}>
			<Text>Opponent's Guess</Text>
			<NumberContainer>{currentGuess}</NumberContainer>
			<Card style={styles.buttonContainer}>
				{/* the strings, lower and the greater are the second paramter of the bind function, which is the argument passed to nextGuessHandler */}
				<MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
					<Ionicons name='md-remove' size={24} color='white' />
				</MainButton>
				<MainButton onPress={nextGuessHandler.bind(this, 'greater')}>
					<Ionicons name='md-add' size={24} color='white' />
				</MainButton>
			</Card>

			<ScrollView>
				{pastGuesses.map((guess) => (
					<View key={guess}>
						<Text>{guess}</Text>
					</View>
				))}
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		padding: 10,
		alignItems: 'center',
	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginTop: 20,
		width: 300,
		maxWidth: '80%',
	},
});

export default GameScreen;
