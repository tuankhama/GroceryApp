import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../../service/Home/HomeService';
import { useSelector } from 'react-redux';

const ItemSanPham = (props) => {

    const { item } = props.item;
    const navigation = useNavigation();
    // format 
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth)
    return (
        <TouchableOpacity
            onPress={() => navigation.navigate("DetailStack", { idProduct: item._id })}
            activeOpacity={0.8} style={styles.category}>
            <Image style={styles.image} source={{ uri: item.image }} />
            <Text style={styles.name}>{item.name}</Text>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View>
                    <Text style={styles.weight}>{item.mass}</Text>
                    <Text style={styles.price}>{item.price.toLocaleString('vi-VN')}</Text>
                </View>
                <TouchableOpacity
                    onPress={() => dispatch(addItemToCart(user._id, item._id))}
                >
                    <Image style={{ height: 40, width: 40 }} source={require('../../media/images/add.png')}></Image>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
};

export default ItemSanPham;

const styles = StyleSheet.create({
    category: {
        width: 150,
        height: 200,
        borderRadius: 20,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#ddd',
        marginHorizontal: 7,
        elevation: 5,
        padding: 10,
        shadowColor: '#333', // Màu của bóng
        shadowOffset: { width: 0, height: 4 }, // Độ dịch chuyển của bóng đổ
        shadowOpacity: 0.5, // Độ trong suốt của bóng đổ
        shadowRadius: 3, // Độ cong của bóng đổ
    },

    image: {
        width: 100,
        resizeMode: 'contain',
        height: 100,
        borderRadius: 10,
        alignSelf: 'center',
    },
    name: {
        fontSize: 16,
        fontWeight: '600',
        color: 'black',
    },
    weight: {
        fontSize: 12,
        color: '#929292',
    },
    price: {
        marginVertical: 5,
        fontSize: 13,
        fontWeight: '500',
        color: 'red',
    }
});
