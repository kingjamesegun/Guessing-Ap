import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
// import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';

import Header from './components/Header';
import GameScreen from './screens/GameScreen';
import StartGameScreen from './screens/StartGameScreen';
import GameOverScreen from './screens/GameOverScreen';

const fetchFonts = async () => {
	return await Font.loadAsync({});
};

export default function App() {
	const [userNumber, setuserNumber] = useState();
	const [guessRounds, setGuessRounds] = useState(0);

	let [fontsLoaded] = useFonts({
		'open-sans': require('./assets/fonts/OpenSans-Bold.ttf'),
		'open-regular': require('./assets/fonts/OpenSans-Regular.ttf'),
		'roboto-regular': require('./assets/fonts/Roboto-Regular.ttf'),
	});

	if (!fontsLoaded) {
		return <AppLoading />;
	}

	const configueNewGameNumber = () => {
		setGuessRounds(0);
		setuserNumber(null);
	};

	const startGameHandler = (selectedNumber) => {
		setuserNumber(selectedNumber);
		setGuessRounds(0);
	};

	const gameOverHandler = (numOfRounds) => {
		setGuessRounds(numOfRounds);
	};

	let content = <StartGameScreen onStartGame={startGameHandler} />;
	// content = (
	// 	<GameOverScreen
	// 		roundsNumber={1}
	// 		userNumber={1}
	// 		onRestart={configueNewGameNumber}
	// 	/>
	// );

	if (userNumber && guessRounds <= 0) {
		content = (
			<GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />
		);
	} else if (guessRounds > 0) {
		content = (
			<GameOverScreen
				roundsNumber={guessRounds}
				userNumber={userNumber}
				onRestart={configueNewGameNumber}
			/>
		);
	}

	return (
		<View style={styles.screen}>
			<Header title='Guess a Number' />
			{content}
		</View>
	);
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
	},
});
