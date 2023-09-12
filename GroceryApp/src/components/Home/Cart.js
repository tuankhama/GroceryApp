import { SafeAreaView, StatusBar, StyleSheet, TouchableOpacity, Image, Text, View } from 'react-native'
import React from 'react'
import UIHeader from '../UICustom/UIHeader'
import { SwipeListView } from 'react-native-swipe-list-view'
import { RenderHiddenItem, RenderSwipeableItem } from '../ItemFlatLists/ItemSwipeable'
import { useSelector } from 'react-redux'
import UILoading from '../UICustom/UILoading'
import UIButton from '../UICustom/UIButton'
import { useNavigation } from '@react-navigation/native'
import CartEmty from './CartEmty'
const Cart = () => {
    const navigation = useNavigation()
    const { cart, isLoading } = useSelector((state) => state.cart)
    return (
        <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
            {cart.length == 0 ?
                <CartEmty></CartEmty>
                :
                <SafeAreaView style={{ paddingTop: StatusBar.currentHeight, flex: 1, backgroundColor: '#FFFFFF' }}>
                    <View style={{ marginHorizontal: 10, }}>
                        <UIHeader title='Giỏ hàng'></UIHeader>
                    </View>
                    <SwipeListView
                        contentContainerStyle={{ paddingTop: 10, }}
                        data={cart}
                        keyExtractor={item => item.product._id}
                        renderItem={(item) => <RenderSwipeableItem data={item}></RenderSwipeableItem>}
                        renderHiddenItem={(item) => <RenderHiddenItem data={item}></RenderHiddenItem>}
                        rightOpenValue={-75}
                        disableRightSwipe
                    />
                    <UIButton
                        onPress={() => navigation.navigate("PaymentStack")}
                        title="Thanh Toán" />
                    <UILoading visible={isLoading} />

                </SafeAreaView>
            }

        </View>



    )
}

export default Cart
