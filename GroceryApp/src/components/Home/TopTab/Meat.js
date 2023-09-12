import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FlatList } from 'react-native'
import { useDispatch } from 'react-redux'
import { getProductByIdCate, getProductCate } from '../../../service/Home/HomeService'
import { useSelector } from 'react-redux'
import ItemSanPham from '../../ItemFlatLists/ItemSanPham'
import ItemSanPham2 from '../../ItemFlatLists/ItemSanPham2'
import UILoading from '../../UICustom/UILoading'

const Meat = (props) => {
    const [dataMeat, setDataMeat] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const idCate = "64cf496317735b776851c13e"
    useEffect(() => {
        const listMeat = async () => {
            setIsLoading(true)
            const respone = await getProductByIdCate(idCate)
            setDataMeat(respone)
            setIsLoading(false)
        }
        listMeat()
    }, [])

    return (
        <View style={styles.container}>
            <FlatList
                data={dataMeat}
                keyExtractor={dataMeat._id}
                numColumns={2}
                renderItem={(item) => <ItemSanPham2 item={item} />}
            ></FlatList>
            <UILoading visible={isLoading} />
        </View>
    )
}

export default Meat

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    }
})