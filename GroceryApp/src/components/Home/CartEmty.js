import { SafeAreaView, StatusBar, StyleSheet, Text, View, Image, Platform } from 'react-native'
import React from 'react'
import UIHeader from '../UICustom/UIHeader'
import UIButton from '../UICustom/UIButton'
import { useNavigation } from '@react-navigation/native'

const CartEmty = () => {
    const navigation = useNavigation()
    return (
        <SafeAreaView style={{ flex: 1, paddingTop: StatusBar.currentHeight, marginHorizontal: 24, justifyContent: 'space-between' }}>
            <View>
                <UIHeader title="Cart"></UIHeader>
                <Image source={require('../../media/images/bgFavorite.png')}></Image>
                <Text style={styles.text}>Bạn chưa có sản phẩm trong giỏ hàng</Text>
                <Text style={styles.text1}>Bắt đầu mua sắm nào !!!</Text>
            </View>
            <View style={{ marginBottom: Platform.OS === 'android' ? 20 : 0, }}>
                <UIButton
                    onPress={() => navigation.navigate("Category", { screen: "ProductStack" })}
                    title='Bắt đầu mua sắm'></UIButton>
            </View>
        </SafeAreaView >
    )
}

export default CartEmty

const styles = StyleSheet.create({

    text: {
        fontStyle: 'normal',
        fontWeight: '700',
        letterSpacing: 0.5,
        fontSize: 20,
        color: 'black',
        textAlign: 'center',
        marginTop: 20,
    },
    text1: {
        textAlign: 'center',
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: 14,
        color: '#706B67',

    },

})