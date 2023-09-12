import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const ItemLoaiHang = (props) => {
    const navigation = useNavigation();
    const { item } = props.item;
    return (
        <TouchableOpacity
            onPress={() => navigation.navigate("ProductStack", { screen: item.name, idCate: item._id })}
            activeOpacity={0.8} style={styles.category}>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={{ uri: item.image }} />
            </View>
            <Text style={styles.name}>{item.name}</Text>
        </TouchableOpacity>
    );
};

export default ItemLoaiHang;

const styles = StyleSheet.create({
    category: {
        width: 120,
        height: 140,
        borderRadius: 20,
        backgroundColor: 'white',
        borderColor: '#ddd',
        marginHorizontal: 7,
        justifyContent: 'center',
        elevation: 5,
        borderWidth: 1,
        shadowColor: '#333', // Màu của bóng
        shadowOffset: { width: 0, height: 2 }, // Độ dịch chuyển của bóng đổ
        shadowOpacity: 0.5, // Độ trong suốt của bóng đổ
        shadowRadius: 5, // Độ cong của bóng đổ
    },
    imageContainer: {
        alignItems: 'center',
        margin: 5,
    },
    image: {
        width: 100,
        borderRadius: 10,
        height: 100,
        resizeMode: 'contain'
    },
    name: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        textAlign: 'center',
    },
});
