import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { addItemToCart, addQuantity, decreaseQuantityService, removeItemToCart } from '../../service/Home/HomeService';
import { decreaseQuantity, increaseQuantity } from '../../redux/home/cartSlice';


export const RenderSwipeableItem = (props) => {
    const { item } = props.data
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth)
    return (
        <TouchableOpacity>
            <View style={styles.item}>
                <Image style={styles.imageIcon} source={{ uri: item.product.image }}></Image>

                <View style={{ flex: 1, }}>

                    <Text style={styles.textTitle}>{item.product.name}</Text>
                    <View style={{
                        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'
                        ,
                    }}>
                        <View style={styles.containerTong}>
                            <TouchableOpacity
                                onPress={() => dispatch(decreaseQuantityService(user._id, item.product._id))}

                                style={styles.containerQuantity}>
                                <Image style={styles.imageQuantity} source={require('../../media/images/delete.png')}></Image>

                            </TouchableOpacity>
                            <Text style={styles.textQuantity}>{item.quantity}</Text>
                            <TouchableOpacity
                                onPress={() => dispatch(addQuantity(user._id, item.product._id))}

                                style={styles.containerQuantity}>
                                <Image style={styles.imageQuantity} source={require('../../media/images/addquantity.png')}></Image>
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.mass}>{item.product.mass}</Text>
                    </View>

                </View>

            </View>
        </TouchableOpacity>
    );

};

export const RenderHiddenItem = (props) => {
    const { user } = useSelector((state) => state.auth)
    const { item } = props.data
    const dispatch = useDispatch()
    const handleDeleteItem = (idProduct) => {
        dispatch(removeItemToCart(user._id, idProduct))
    }
    return (

        <TouchableOpacity onPress={() => handleDeleteItem(item.product._id)} style={styles.deleteButton}>
            <Image style={{ width: 30, height: 30 }} source={require('../../media/images/remove.png')}></Image>
        </TouchableOpacity>
    );
};


const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    container: {
        padding: 20,

    },
    item: {
        flexDirection: 'row',
        height: 100,
        alignItems: 'center',
        paddingHorizontal: 16,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 0.2,
        borderBottomColor: '#6D3805'
    },
    text: {
        fontSize: 16,
    },
    deleteButton: {
        height: 100,
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingRight: 16,
        backgroundColor: '#cb2027',
    },

    imageIcon: {
        height: 85,
        width: 85,
        borderRadius: 20,
        resizeMode: 'contain'
    },
    textTitle: {
        marginLeft: 25,
        color: 'black',
        fontSize: 18,
        fontWeight: '700',
    },
    textQuantity: {
        color: '#6D3805',
        fontSize: 18,
        fontWeight: '400',
    },
    imageQuantity: {
        width: 15,
        height: 15,
    },
    containerQuantity: {
        backgroundColor: '#FFFFFF',
        borderRadius: 50,
        height: 25,
        width: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerTong: {
        flexDirection: 'row', height: 30,
        backgroundColor: '#F4F4F4',
        justifyContent: 'space-between',
        width: 100,
        paddingHorizontal: 2,
        alignItems: 'center',
        borderRadius: 50,
        marginLeft: 50,
        marginTop: 10,
    },
    mass: {
        color: '#6D3805',
        fontSize: 18,
        fontWeight: '400',
    },
    titleText: {
        color: "#FF5E00",
        fontSize: 24,
        fontStyle: 'normal',
        fontWeight: '700',
        textAlign: 'center',
        marginTop: 5,
    },
});