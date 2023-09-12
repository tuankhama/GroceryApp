import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'
import color from '../styles/Colors'

const UIInput = (props) => {
    const { onChangeText, value, placeholder, stylee, onFocus, onBlur, editable } = props
    return (
        <View>
            <TextInput
                editable={editable}
                onBlur={onBlur}
                onFocus={onFocus}
                onChangeText={onChangeText}
                value={value}
                style={[styles.textInput, stylee]}
                placeholder={placeholder}
            ></TextInput>
        </View>
    )
}

export default UIInput

const styles = StyleSheet.create({
    textInput: {
        height: 50,
        borderRadius: 10,
        backgroundColor: color.textInput,
        paddingLeft: 10,
        marginVertical: 5,
    }
})