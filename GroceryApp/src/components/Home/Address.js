import React, { useEffect } from 'react'
import { StatusBar } from 'react-native'
import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import UIHeader from '../UICustom/UIHeader'
import { FlatList } from 'react-native-gesture-handler'
import { SwipeListView } from 'react-native-swipe-list-view'
import { ItemAddress, ItemHiddenAddress } from '../ItemFlatLists/ItemAddress'
import UIButton from '../UICustom/UIButton'
import { useNavigation } from '@react-navigation/native'
import { createAddressOnSever, setAddressDataOnSever } from '../../service/Home/HomeService'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
const Address = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch()
    const { addresses } = useSelector((state) => state.address)
    const { user } = useSelector((state) => state.auth)
    useEffect(() => {
        const fecthData = async () => {
            dispatch(setAddressDataOnSever(user._id))
        }
        fecthData()
    }, [])


    return (
        <SafeAreaView style={{ paddingTop: StatusBar.currentHeight, flex: 1, backgroundColor: "#FFFFFF" }}>
            <View style={{ marginHorizontal: 10, }}>
                <UIHeader title='Địa chỉ của tôi'></UIHeader>
            </View>
            <Text style={styles.address}>Địa chỉ</Text>
            <SwipeListView
                data={addresses}
                keyExtractor={item => item._id}
                renderItem={(item) => <ItemAddress data={item} />}
                renderHiddenItem={(item) => <ItemHiddenAddress data={item} />}
                disableRightSwipe
                rightOpenValue={-100}
                showsVerticalScrollIndicator={false}
            />
            <UIButton
                onPress={() => navigation.navigate("NewAddressStack")}
                title="Thêm địa chỉ mới" />
        </SafeAreaView>
    )
}

export default Address

const styles = StyleSheet.create({
    address: {
        marginVertical: 10,
        marginHorizontal: 10,
    }
})

