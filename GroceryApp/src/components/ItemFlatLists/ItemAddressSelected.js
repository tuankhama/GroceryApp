import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions } from 'react-native';

export const ItemAddressSelected = (props) => {
    const item = props.data.item;
    const navigation = useNavigation()
    // const [selectedAddress, setSelectedAddress] = useState(null);

    const handlerSelected = (idAddress) => {
        navigation.navigate("PaymentStack", {
            idAddress: idAddress
        })
    }

    // const isSelected = selectedAddress === item;
    // const imageSource = isSelected
    //     ? require("../../media/images/checklist.png")
    //     : require("../../media/images/dry-clean.png")

    return (
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => handlerSelected(item._id)}
            style={[styles.addressItem]}
        >
            <View>
                <Text style={styles.name}>{item.name}</Text>
                <Text
                    numberOfLines={1}
                    style={styles.address}>{item.address}</Text>
                <Text style={styles.phoneNumber}>{item.phone}</Text>
                <Text style={styles.addressType}>{item.detailAddress}</Text>
            </View>

        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    addressItem: {
        justifyContent: 'center',
        height: 120,
        backgroundColor: '#F5F5F5',
        padding: 10,
        borderRadius: 5,
        marginBottom: 5,
        marginHorizontal: 10,

    },
    selectedItem: {
        backgroundColor: 'lightblue', // Màu nền của mục được chọn
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
