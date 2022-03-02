import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from "../constants/colors";

const Header = (props) => {
	return (
		<View style={styles.header}>
			<Text style={styles.headerText}>{props.title}</Text>
		</View>
	);
};


const styles= StyleSheet.create({
    header: {
        width: "100%",
        height: 100,
        paddingTop: 30,
        backgroundColor: Colors.primary,
        alignItems: "center",
        justifyContent: 'center'
    },
    headerText: {
        color: 'black',
        fontSize: 40
    }
})

export default Header;
