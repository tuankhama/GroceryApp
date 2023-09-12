import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import font from '../styles/FONTS';
import color from '../styles/Colors';
const UITitle = (props) => {
    const { title } = props;
    return (
        <Text style={styles.title}>{title}</Text>
    )
}

export default UITitle

const styles = StyleSheet.create({
    title: {
        textAlign: 'center',
        color: color.title,
        fontSize: font.h2,
        fontWeight: '600',
        marginTop: 10,
    }
})