import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { removeAddressOnserver } from '../../service/Home/HomeService';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

export const ItemAddress = (props) => {
    const item = props.data.item;
    const navigation = useNavigation();
    return (
        <TouchableOpacity
            onPress={() => navigation.navigate("EditAddressStack", {
                idAddress: item._id
            })}
            style={styles.addressItem}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.address}>{item.address}</Text>
            <Text style={styles.phoneNumber}>{item.phone}</Text>
            <Text style={styles.addressType}>{item.detailAddress}</Text>
        </TouchableOpacity>
    )
}


export const ItemHiddenAddress = (props) => {
    const item = props.data.item;
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);


    const handleDeleteItem = (idAddress) => {
        dispatch(removeAddressOnserver(user._id, idAddress))
    }

    return (
        <TouchableOpacity onPress={() => handleDeleteItem(item._id)} style={styles.deleteButton}>
            <Image style={{ width: 30, height: 30, right: 20, }} source={require('../../media/images/remove.png')}></Image>
        </TouchableOpacity>
    )

}


const styles = StyleSheet.create({
    deleteButton: {
        zIndex: -10,
        height: 120,
        position: 'absolute',
        right: 10,
        borderTopEndRadius: 20,
        borderBottomRightRadius: 20,
        width: 105,
        justifyContent: 'center',
        alignItems: 'flex-end',
        backgroundColor: '#cb2027',
    },

    addressItem: {
        justifyContent: 'center',
        height: 120,
        backgroundColor: '#F5F5F5',
        padding: 10,
        borderRadius: 5,
        marginBottom: 5,
        marginHorizontal: 10,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    address: {
        fontSize: 14,
        marginBottom: 3,
    },
    phoneNumber: {
        fontSize: 14,
        color: '#555',
        marginBottom: 3,
    },
    addressType: {
        fontSize: 14,
        color: '#888',
    },
});
