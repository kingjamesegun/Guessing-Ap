import React, { useState, useEffect, useRef } from 'react';
import {
	View,
	Text,
	StyleSheet,
	Alert,
	FlatList,
	Dimensions,
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

const renderListItem = (listLength, itemData) => (
	<View style={styles.listItem}>
		<Text>#{listLength - itemData.index}</Text>
		<Text>{itemData.item}</Text>
	</View>
);

const GameScreen = (props) => {
	const initialState = generateRandomBetween(1, 100, userChoice);
	const [currentGuess, setcurrentGuess] = useState(initialState);
	const [pastGuesses, setPastGuesses] = useState([initialState.toString()]);

	const { userChoice, onGameOver } = props;

	const currentLow = useRef(1);
	const currentHigh = useRef(100);

	useEffect(() => {
		if (currentGuess === userChoice) {
			onGameOver(pastGuesses.length);
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
		setPastGuesses((curPastGuesses) => [
			nextNumber.toString(),
			...curPastGuesses,
		]);
	};
	if (Dimensions.get('window').height < 500) {
		<View style={styles.screen}>
			<Text>Opponent's Guess</Text>
			<NumberContainer>{currentGuess}</NumberContainer>
			{/* the strings, lower and the greater are the second paramter of the bind function, which is the argument passed to nextGuessHandler */}
			<View style={styles.controls}>
				<MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
					<Ionicons name='md-remove' size={24} color='white' />
				</MainButton>
				<MainButton onPress={nextGuessHandler.bind(this, 'greater')}>
					<Ionicons name='md-add' size={24} color='white' />
				</MainButton>
			</View>

			<View style={styles.listContainer}>
				{/* <ScrollView contentContainerStyle={styles.list}>
					{pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
				</ScrollView> */}
				<FlatList
					keyExtractor={(item) => item}
					data={pastGuesses}
					renderItem={renderListItem.bind(this, pastGuesses.length)}
					contentContainerStyle={styles.list}
				/>
			</View>
		</View>;
	}

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

			<View style={styles.listContainer}>
				{/* <ScrollView contentContainerStyle={styles.list}>
					{pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
				</ScrollView> */}
				<FlatList
					keyExtractor={(item) => item}
					data={pastGuesses}
					renderItem={renderListItem.bind(this, pastGuesses.length)}
					contentContainerStyle={styles.list}
				/>
			</View>
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
		marginTop: Dimensions.get('window').height > 600 ? 20 : 10,
		width: 300,
		maxWidth: '80%',
	},
	listContainer: {
		flex: 1,
		width: '60%',
	},
	controls:{
		flexDirection: "row",
		justifyContent: 'space-around',
		alignItems: 'center',
		width: '80%'
	},
	list: {
		flexGrow: 1,
		// alignItems: 'center',
		justifyContent: 'flex-end',
	},
	listItem: {
		borderColor: '#ccc',
		borderWidth: 1,
		padding: 15,
		marginVertical: 10,
		backgroundColor: 'white',
		flexDirection: 'row',
		justifyContent: 'space-around',
		width: '100%',
	},
});

export default GameScreen;
