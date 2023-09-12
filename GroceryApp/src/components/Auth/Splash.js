import { SafeAreaView, StyleSheet, Text, View, Image } from 'react-native'
import React, { useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import { useNavigation } from '@react-navigation/native'

const Splash = () => {
    const navigation = useNavigation();
    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.navigate("Welcome");
        }, 2000)

        return () => clearTimeout(timer);
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <Image
                style={{ width: 200, height: 200, resizeMode: 'contain' }}
                source={require('../../media/images/splashbackground.png')} />
            <Text
                style={styles.title}
            >Chào mừng đến với Grocery</Text>

        </SafeAreaView>
    )
}

export default Splash

const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',

    },
    title: {
        color: 'black',
        marginTop: 10,
        fontWeight: 'bold',
    }
}