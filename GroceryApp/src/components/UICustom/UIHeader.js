import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import font from '../styles/FONTS';
import color from '../styles/Colors';
import { useNavigation } from '@react-navigation/native';
const UIHeader = (props) => {
    const navigation = useNavigation();

    const { onPress, title } = props;
    const goback = () => {
        navigation.goBack()
    }
    return (
        <View>
            <TouchableOpacity onPress={onPress || goback} style={styles.btnArrow}>
                <Image source={require('../../media/images/Arrow.png')}></Image>
            </TouchableOpacity>
            <Text style={styles.title}>{title}</Text>

        </View >

    )
}

export default UIHeader

const styles = StyleSheet.create({
    btnArrow: { backgroundColor: '#E5E5E5', padding: 10, borderRadius: 20, width: 35, justifyContent: 'center', alignItems: 'center' },
    title: {
        textAlign: 'center',
        color: color.title,
        fontSize: font.h2,
        fontWeight: '600',

    }
})