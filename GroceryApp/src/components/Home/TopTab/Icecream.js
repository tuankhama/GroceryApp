import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FlatList } from 'react-native'
import { useDispatch } from 'react-redux'
import { getProductByIdCate, getProductCate } from '../../../service/Home/HomeService'
import { useSelector } from 'react-redux'
import ItemSanPham from '../../ItemFlatLists/ItemSanPham'
import ItemSanPham2 from '../../ItemFlatLists/ItemSanPham2'
import UILoading from '../../UICustom/UILoading'

const Icecream = (props) => {
    const [dataIcecream, setDataIcecream] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const idCate = "64cf496b17735b776851c13f"
    useEffect(() => {
        const listIcecream = async () => {
            setIsLoading(true)
            const respone = await getProductByIdCate(idCate)
            setDataIcecream(respone)
            setIsLoading(false)
        }
        listIcecream()
    }, [])

    return (
        <View style={styles.container}>
            <FlatList
                data={dataIcecream}
                keyExtractor={dataIcecream._id}
                numColumns={2}
                renderItem={(item) => <ItemSanPham2 item={item} />}
            ></FlatList>
            <UILoading visible={isLoading} />
        </View>
    )
}

export default Icecream

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    }
})