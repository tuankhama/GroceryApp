import { StyleSheet, Text, View, SafeAreaView, Image } from 'react-native'
import React from 'react'
import UIHeader from '../UICustom/UIHeader'
import { StatusBar } from 'react-native'
import { data, products } from './Home'
import { RenderHiddenItem, RenderSwipeableItem } from '../ItemFlatLists/ItemFavorite'
import { SwipeListView } from 'react-native-swipe-list-view'
import { useSelector } from 'react-redux'
import FavoriteEmty from './FavoriteEmty'
import UILoading from '../UICustom/UILoading'
const Favorite = () => {

    const { favorite, isLoading } = useSelector((state) => state.favorite)
    const { isLoading: cartIsLoading } = useSelector((state) => state.cart)
    return (

        <SafeAreaView style={{ paddingTop: StatusBar.currentHeight, flex: 1, backgroundColor: '#FFFFFF' }}>




            {favorite.length == 0 ?
                <FavoriteEmty />
                :
                <View style={{ flex: 1 }}>
                    <View style={{ marginHorizontal: 10, }}>
                        <UIHeader title="Favorite"></UIHeader>
                    </View>

                    <SwipeListView
                        data={favorite}
                        keyExtractor={item => item._id}
                        renderItem={(item) => <RenderSwipeableItem data={item} />}
                        renderHiddenItem={(item) => <RenderHiddenItem data={item} />}
                        rightOpenValue={-75}
                        disableRightSwipe
                    />
                </View>
            }
            <UILoading visible={isLoading} />
            <UILoading visible={cartIsLoading} />
        </SafeAreaView>
    )
}

export default Favorite

const styles = StyleSheet.create({})