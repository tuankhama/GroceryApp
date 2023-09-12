import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const ItemBill = (props) => {
    const { item } = props
    return (
        <View style={styles.productItem}>
            <Image style={styles.productImage} source={{ uri: item.product.image }} />
            <View style={styles.productDetails}>
                <Text style={styles.productName}>{item.product.name}</Text>
                <Text style={styles.productPrice}>Giá tiền: {(item.product.price).toLocaleString("vi")} VNĐ</Text>
                <Text style={styles.productQuantity}>Số lượng: {item.quantity}</Text>
            </View>
        </View>
    )
}

export default ItemBill

const styles = StyleSheet.create({
    productItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
        backgroundColor: '#F5F5F5',
        borderRadius: 10,
        padding: 10,
    },
    productImage: {
        width: 80,
        height: 80,
        marginRight: 10,
        borderRadius: 8,
    },
    productDetails: {
        flex: 1,
        justifyContent: 'center',
    },
    productName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    productPrice: {
        fontSize: 14,
        color: '#555',
        marginBottom: 3,
    },
    productQuantity: {
        fontSize: 14,
        color: '#555',
    },
})