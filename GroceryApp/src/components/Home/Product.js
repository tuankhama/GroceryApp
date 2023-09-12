import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import UIHeader from '../UICustom/UIHeader'
import TopTab from './TopTab/TopTab'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import UILoading from '../UICustom/UILoading'

const Product = (props) => {
    const navigation = useNavigation()
    const { isLoading: cartIsLoading } = useSelector((state) => state.cart)

    return (
        <SafeAreaView style={{ flex: 1, paddingTop: StatusBar.currentHeight, backgroundColor: '#FFFFFF' }}>
            <View style={{ marginHorizontal: 10, }}>
                <UIHeader
                    onPress={() => navigation.navigate("Category", { screen: "CategoryStack" })}
                    title='Sản phẩm'></UIHeader>
            </View>
            <TopTab />
            <UILoading visible={cartIsLoading} />
        </SafeAreaView>
    )
}

export default Product

const styles = StyleSheet.create({})