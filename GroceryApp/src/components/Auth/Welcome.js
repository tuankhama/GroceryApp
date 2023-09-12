import { SafeAreaView, StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import font from '../styles/FONTS'
import { StatusBar } from 'react-native'
import UIButton from '../UICustom/UIButton'
import { useNavigation } from '@react-navigation/native'
const Welcome = () => {
    const navigation = useNavigation();
    const moveNavigation = (name) => {
        navigation.navigate(name)
    }
    return (

        <SafeAreaView style={{ flex: 1, paddingTop: StatusBar.currentHeight, backgroundColor: '#FFFFFF' }}>
            <View style={{ flex: 2.5 }}>
                <Image
                    style={{ alignSelf: 'center' }}
                    source={require('../../media/images/splashbackground.png')} />
                <Text style={styles.title}>Thư giãn và mua sắm</Text>
                <Text style={styles.description}>Mua sắm trực tuyến và vận chuyển hàng đến nhà của bạn trong vòng 1 giờ.</Text>
            </View>
            <View style={{ flex: 1, marginVertical: 20, justifyContent: 'center' }}>
                <UIButton onPress={() => moveNavigation('Register')} title='Đăng ký' />
                <UIButton
                    onPress={() => moveNavigation('Login')}
                    buttonStyle={styles.btnLogin}
                    title="Đăng nhập"
                    titleStyle={{ color: "#3DAB55" }} />
            </View>
        </SafeAreaView>
    )
}

export default Welcome

const styles = StyleSheet.create({
    title: {
        textAlign: 'center',
        marginTop: 24,
        fontSize: font.h4,
        fontWeight: 'bold',
        color: '#3DAB55',
    },
    description: {
        textAlign: 'center',
        fontSize: font.h6,
        color: '#969696',
        width: '70%',
        alignSelf: 'center',
    },
    btnLogin: {
        borderWidth: 0.5,
        borderColor: '#3DAB55',
        backgroundColor: '#FFFFFF',
    }

})