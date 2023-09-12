import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FlatList } from 'react-native'
import { useDispatch } from 'react-redux'
import { getProductByIdCate, getProductCate } from '../../../service/Home/HomeService'
import { useSelector } from 'react-redux'
import ItemSanPham from '../../ItemFlatLists/ItemSanPham'
import ItemSanPham2 from '../../ItemFlatLists/ItemSanPham2'
import UILoading from '../../UICustom/UILoading'

const Juice = (props) => {
    const [dataJuice, setDataJuice] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const idCate = "64cf497317735b776851c140"
    useEffect(() => {
        const listJuice = async () => {
            setIsLoading(true)
            const respone = await getProductByIdCate(idCate)
            setDataJuice(respone)
            setIsLoading(false)
        }
        listJuice()
    }, [])

    return (
        <View style={styles.container}>
            <FlatList
                data={dataJuice}
                keyExtractor={dataJuice._id}
                numColumns={2}
                renderItem={(item) => <ItemSanPham2 item={item} />}
            ></FlatList>
            <UILoading visible={isLoading} />
        </View>
    )
}

export default Juice

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    }
})