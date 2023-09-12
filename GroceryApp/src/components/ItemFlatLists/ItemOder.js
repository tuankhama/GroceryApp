import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import moment from 'moment/moment';
const OrderItem = props => {
    const item = props.data.item
    const formattedDate = moment(item.createAt).format('DD/MM/YYYY');
    const navigation = useNavigation();

    let totalPayment = 0;

    item.billItem.forEach((element) => {
        totalPayment += element.product.price * element.quantity
    });
    return (
        <TouchableOpacity
            onPress={() => navigation.navigate("OderDetailStack", { idBill: item._id })}
            activeOpacity={0.8} style={styles.container}>
            <Image source={require("../../media/images/gift.png")} style={styles.image} resizeMode="cover" />
            <View style={styles.details}>
                <View style={styles.header}>
                    <Text style={styles.title}>Đơn hàng #{item.nameBill}</Text>

                </View>
                <View style={styles.statusContainer}>
                    <Text style={styles.status}>Ngày đặt hàng:</Text>
                    <Text style={styles.dateTitle}>{formattedDate}</Text>
                </View>
                <View style={styles.statusContainer}>
                    <Text style={styles.status}>Trạng thái:</Text>
                    <Text style={[styles.statusTitle, getStatusStyle(item.status)]}>{
                        item.status == 0 ? "Đã hủy" : item.status == 1 ? "Đã đặt hàng" : item.status == 2 ?
                            "Đã xác nhận" : item.status == 3 ? "Đã giao hàng" :
                                ""
                    }</Text>
                </View>
                <View style={styles.totalContainer}>
                    <Text style={styles.total}>Tổng tiền:</Text>
                    <Text style={styles.amount}>{totalPayment.toLocaleString("vi")}</Text>
                </View>
            </View>
        </TouchableOpacity >
    );
};

export const getStatusStyle = (status) => {
    switch (status) {
        case 0:
            return { color: 'red' }; // Red for status 0 (Đã hủy)
        case 1:
            return { color: '#808080' }; // Purple for status 3 (Đã giao hàng)

        case 2:
            return { color: 'black' }; // Blue for status 2 (Đã xác nhận)
        case 3:
            return { color: '#27AE60' }; // Green for status 1 (Đã đặt hàng)

        default:
            return { color: '#666666' }; // Default color for other cases
    }
};

// status = 0 : cancel;
// status = 1 : da dat hang,
// status = 2 : da xac nhan,
// status = 3 : da giao hang,
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        elevation: 4,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 12,
        marginRight: 16,
    },
    details: {
        flex: 1,
        justifyContent: 'center',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333333',
    },
    date: {
        fontSize: 14,
        color: '#666666',
        marginBottom: 4,
    },
    statusContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    status: {
        fontSize: 14,
        color: '#666666',
    },
    statusTitle: {
        fontSize: 14,
        color: 'red',
        fontWeight: 'bold',
    },
    totalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    total: {
        fontSize: 14,
        color: '#666666',
        fontWeight: '600'
    },
    amount: {
        fontSize: 16,
        fontWeight: '700',
        color: 'black',
    },

});

export default OrderItem;
