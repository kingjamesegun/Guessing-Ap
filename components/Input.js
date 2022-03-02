import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { clickProps } from 'react-native-web/dist/cjs/modules/forwardedProps';

const Input = (props) => {
	return <TextInput {...props} style={{ ...styles.input, ...props.style }} />;
};

const styles = StyleSheet.create({
    input : {
        height: 30,
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
        marginVertical: 10
    }
});

export default Input;
