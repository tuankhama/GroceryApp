import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import font from '../styles/FONTS'

const UIButton = (props) => {
    const { onPress, title, buttonStyle, titleStyle } = props;
    return (
        <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={[styles.container, buttonStyle]}>
            <Text style={[styles.title, titleStyle]}>{title}</Text>
        </TouchableOpacity >
    )
}
export default UIButton

const styles = StyleSheet.create({
    container: {
        height: 50,
        width: '80%',
        alignSelf: 'center',
        backgroundColor: '#3DAB55',
        alignItems: "center",
        justifyContent: 'center',
        borderRadius: 23,
        margin: 7,
    },
    title: {
        color: '#FFFFFF',
        fontSize: font.h6,
        fontWeight: '600',
    }
})