import { SafeAreaView, StatusBar, StyleSheet, TouchableOpacity, Image, Text, View } from 'react-native'
import React from 'react'
import UIHeader from '../UICustom/UIHeader'
import { SwipeListView } from 'react-native-swipe-list-view'
import { RenderHiddenItem, RenderSwipeableItem, renderHiddenItem, renderSwipeableItem } from '../ItemFlatLists/ItemSwipeable'
import { useSelector } from 'react-redux'
const Item = () => {
    const { cart } = useSelector((state) => state.cart)

    return (
        <SafeAreaView style={{ paddingTop: StatusBar.currentHeight, flex: 1, backgroundColor: '#FFFFFF' }}>
            <View style={{ marginHorizontal: 10, }}>
                <UIHeader title='Sản phẩm đã chọn'></UIHeader>

            </View>
            <SwipeListView
                contentContainerStyle={{ paddingTop: 10, }}
                data={cart}
                keyExtractor={item => item.product._id}
                renderItem={(item) => <RenderSwipeableItem data={item} />}
                renderHiddenItem={(item) => <RenderHiddenItem data={item} />}
                rightOpenValue={-75}
                disableRightSwipe
            />
        </SafeAreaView>
    )
}

export default Item


