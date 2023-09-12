import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FlatList } from 'react-native'
import { useDispatch } from 'react-redux'
import { getProductByIdCate, getProductCate } from '../../../service/Home/HomeService'
import { useSelector } from 'react-redux'
import ItemSanPham from '../../ItemFlatLists/ItemSanPham'
import ItemSanPham2 from '../../ItemFlatLists/ItemSanPham2'
import UILoading from '../../UICustom/UILoading'

const Fruit = (props) => {
    const [dataFruit, setDataFruit] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const idCate = "64cf491917735b776851c13c"
    useEffect(() => {
        const listFruit = async () => {
            setIsLoading(true)
            const respone = await getProductByIdCate(idCate)
            setDataFruit(respone)
            setIsLoading(false)
        }
        listFruit()
    }, [])

    return (
        <View style={styles.container}>
            <FlatList
                data={dataFruit}
                keyExtractor={dataFruit._id}
                numColumns={2}
                renderItem={(item) => <ItemSanPham2 item={item} />}
            ></FlatList>
            <UILoading visible={isLoading} />
        </View>
    )
}

export default Fruit

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    }
})