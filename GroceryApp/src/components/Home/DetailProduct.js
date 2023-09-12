import { StyleSheet, Text, View, SafeAreaView, StatusBar, TouchableOpacity, Image, ScrollView, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { data, products } from './Home';
import ItemSanPham from '../ItemFlatLists/ItemSanPham';
import { useNavigation } from '@react-navigation/native';
import UIButton from '../UICustom/UIButton';
import { addFavorite, addItemToCart, getAllProduct, getDetailProduct, getFavorite, removeFavorite } from '../../service/Home/HomeService';
import UILoading from '../UICustom/UILoading';
import { useSelector, useDispatch } from 'react-redux';
import { setProducts } from '../../redux/home/productSlice'; // Import các action từ slice
import { setProductDetail } from '../../redux/home/productDetailSlice'; // Import các action từ slice
import { updateFavorite } from '../../redux/home/favoriteSlice';

const DetailProduct = (props) => {
    const navigation = useNavigation();
    const [isFavorite, setIsFavorite] = useState(Boolean);
    const { idProduct } = props.route.params
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products);
    const { user } = useSelector((state) => state.auth)
    const { isLoading: cartIsLoading } = useSelector((state) => state.cart)
    const { favorite } = useSelector((state) => state.favorite);
    const { data, isLoading } = useSelector((state) => state.productDetail)
    useEffect(() => {
        dispatch(getAllProduct())
    }, []);

    useEffect(() => {
        dispatch(getDetailProduct(idProduct))
        setQuantity(1)
    }, [idProduct]);
    useEffect(() => {
        setIsFavorite(favorite.some(product => product._id === idProduct));
    }, [favorite, idProduct]);

    const handleFavorite = () => {
        if (isFavorite) {
            setIsFavorite(false)
            dispatch(removeFavorite(user._id, idProduct))

        } else {
            setIsFavorite(true)
            dispatch(addFavorite(user._id, idProduct))
        }
    }
    const [quantity, setQuantity] = useState(1)
    const increseQuantity = () => {
        setQuantity((quantity) => quantity + 1)
    }
    const decreseQuantity = () => {
        if (quantity > 1) {
            setQuantity((quantity) => quantity - 1)
        }
    }
    const handleAddCart = () => {
        dispatch(addItemToCart(user._id, idProduct, quantity))
        setQuantity(1)
        setTimeout(() => {
            navigation.navigate("Cart")
        }, 2000)
    }

    return (

        <SafeAreaView style={{ flex: 1, paddingTop: StatusBar.currentHeight, backgroundColor: '#FFFFFF' }}>
            <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={styles.btnArrow}>

                <Image source={require('../../media/images/Arrow.png')}></Image>
            </TouchableOpacity>


            <ScrollView style={{ marginHorizontal: 10 }}>


                <Image style={{ alignSelf: 'flex-end', position: 'absolute' }} source={require('../../media/images/bgDetail.png')}></Image>
                <View style={{ paddingTop: 100, }}>
                    <Image
                        style={styles.image}
                        source={{ uri: data.image }}></Image>
                </View>
                <Text style={styles.title}>{data.name}</Text>
                <Text style={styles.price}>
                    {data && data.price ? data.price.toLocaleString("vi-VN") : ""}
                </Text>

                <Text style={styles.description} numberOfLines={3}>{data.description}</Text>
                <View style={{ flexDirection: 'row', marginTop: 20, alignItems: 'center' }} >
                    <View style={{
                        flexDirection: 'row', width: '80%', justifyContent: 'space-between',
                        backgroundColor: '#F4F4F4',
                        alignItems: 'center',
                        paddingHorizontal: 5,
                        borderRadius: 20,
                        height: 50,
                    }}>
                        <TouchableOpacity style={styles.containerDecrase}
                            onPress={decreseQuantity}
                        >
                            <Image style={styles.imageIcon} source={require('../../media/images/delete.png')} />
                        </TouchableOpacity>
                        <Text

                            style={styles.quantity}>{quantity}</Text>
                        <TouchableOpacity
                            onPress={increseQuantity}

                            style={styles.containerDecrase}>
                            <Image style={styles.imageIcon} source={require('../../media/images/addquantity.png')} />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        onPress={handleFavorite}
                    >
                        {isFavorite == false ?
                            <Image style={styles.favourite} source={require('../../media/images/favourite.png')} />
                            :
                            <Image style={styles.favourite} source={require('../../media/images/favouritefocue.png')} />

                        }
                    </TouchableOpacity>
                </View>
                <View style={{ marginVertical: 10, }}>
                    <UIButton
                        onPress={handleAddCart}
                        title='Thêm vào giỏ hàng'></UIButton>

                </View>

                <Text style={styles.nedd}>Có thể bạn cũng cần</Text>
                <FlatList
                    data={products}
                    keyExtractor={(item) => item._id}
                    renderItem={(item) => <ItemSanPham item={item} />}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ marginBottom: 60, marginTop: 20, }}
                >
                </FlatList>

            </ScrollView >
            <UILoading visible={isLoading} />
            <UILoading visible={cartIsLoading} />
        </SafeAreaView >


    )
}

export default DetailProduct

const styles = StyleSheet.create({
    btnArrow: {
        backgroundColor: '#E5E5E5',
        padding: 10,
        borderRadius: 20,
        width: 35,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10
    },
    image: {
        width: 250,
        height: 250,
        alignSelf: 'center',
        borderRadius: 20,
        resizeMode: 'contain'
    },
    title: {
        marginTop: 20,
        color: 'black',
        fontSize: 24,
        fontWeight: '700',

    },
    price: {
        color: 'red',
        fontSize: 24,
        fontWeight: '600',
        marginTop: 10,
    },
    description: {
        marginTop: 8,
        color: '#6D3805',
        fontSize: 14,
        fontWeight: '400',
    },
    quantity: {
        // 2
        color: '#6D3805',
        fontSize: 24,
        fontWeight: '400',


    },
    description: {
        marginTop: 8,
        color: '#6D3805',
        fontSize: 14,
        fontWeight: '400',
    },
    imageIcon: {
        width: 20,
        height: 20,
    },
    containerDecrase: {
        backgroundColor: '#FFFFFF',
        height: 40,
        width: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
    },
    favourite: {
        marginLeft: 30,
        height: 30,
        width: 30,
    },
    nedd: {
        color: '#6D3805',
        fontSize: 18,
        marginTop: 30,
        fontWeight: '700'
    }
})