import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FlatList } from 'react-native'
import { useDispatch } from 'react-redux'
import { getProductByIdCate, getProductCate } from '../../../service/Home/HomeService'
import { useSelector } from 'react-redux'
import ItemSanPham from '../../ItemFlatLists/ItemSanPham'
import ItemSanPham2 from '../../ItemFlatLists/ItemSanPham2'
import UILoading from '../../UICustom/UILoading'

const Fish = (props) => {
    const [dataFish, setDataFish] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const idCate = "64cf495c17735b776851c13d"
    useEffect(() => {
        const listFish = async () => {
            setIsLoading(true)
            const respone = await getProductByIdCate(idCate)
            setDataFish(respone)
            setIsLoading(false)
        }
        listFish()
    }, [])

    return (
        <View style={styles.container}>
            <FlatList
                data={dataFish}
                keyExtractor={dataFish._id}
                numColumns={2}
                renderItem={(item) => <ItemSanPham2 item={item} />}
            ></FlatList>
            <UILoading visible={isLoading} />
        </View>
    )
}

export default Fish

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    }
})