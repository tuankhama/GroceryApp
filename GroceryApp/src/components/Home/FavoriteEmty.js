import { SafeAreaView, StatusBar, StyleSheet, Text, View, Image, Platform } from 'react-native'
import React from 'react'
import UIHeader from '../UICustom/UIHeader'
import UIButton from '../UICustom/UIButton'
import { useNavigation } from '@react-navigation/native'

const FavoriteEmty = () => {
    const navigation = useNavigation()
    return (
        <SafeAreaView style={{ flex: 1, paddingTop: StatusBar.currentHeight, marginHorizontal: 24, justifyContent: 'space-between' }}>
            <View>
                <UIHeader title="Favorite"></UIHeader>
                <Image source={require('../../media/images/bgFavorite.png')}></Image>
                <Text style={styles.text}>Bạn chưa có sản phẩm yêu thích nào</Text>
                <Text style={styles.text1}>Bắt đầu thêm sản phẩm tốt vào danh sách yêu thích</Text>
            </View>
            <View style={{ marginBottom: Platform.OS === 'android' ? 20 : 0, }}>
                <UIButton
                    onPress={() => navigation.navigate("Category", { screen: "ProductStack" })}
                    title='Bắt đầu mua sắm'></UIButton>
            </View>
        </SafeAreaView >
    )
}

export default FavoriteEmty

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