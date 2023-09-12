import { StyleSheet, Text, View, SafeAreaView, FlatList } from 'react-native'

import React, { useEffect, useState } from 'react'
import UIHeader from '../UICustom/UIHeader'
import { StatusBar } from 'react-native'
import { data, products } from './Home'
import ItemOder from '../ItemFlatLists/ItemOder'
import { getBill } from '../../service/Auth/UserService'
import { useSelector } from 'react-redux'
import BillIEmty from './BillIEmty'
import { useDispatch } from 'react-redux'

const Oders = () => {
    const { user } = useSelector((state) => state.auth)
    const { bill } = useSelector((state) => state.bill)
    const dispatch = useDispatch()
    useEffect(() => {
        const fecthData = async () => {
            dispatch(getBill(user._id))
        }
        fecthData()
    }, [])
    return (
        bill.length == 0 ?
            <BillIEmty /> :
            <SafeAreaView style={{ flex: 1, paddingTop: StatusBar.currentHeight, backgroundColor: "#FFFFFF", }}>
                <View style={{ marginHorizontal: 10 }}>
                    <UIHeader title="Đơn hàng"></UIHeader>
                    <FlatList
                        contentContainerStyle={{ marginTop: 20, paddingBottom: 80, }}
                        showsVerticalScrollIndicator={false}
                        data={bill}
                        keyExtractor={(item) => item._id}
                        renderItem={(item) => <ItemOder data={item} />}
                    ></FlatList>
                </View>

            </SafeAreaView>
    )
}

export default Oders

const styles = StyleSheet.create({})