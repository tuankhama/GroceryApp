import React, { useEffect } from 'react';
import { StyleSheet, View, Text, SafeAreaView, StatusBar, Image, FlatList, ScrollView } from 'react-native';
import UIHeader from '../UICustom/UIHeader';
import UIButton from '../UICustom/UIButton';
import ItemOder, { getStatusStyle } from '../ItemFlatLists/ItemOder';
import ItemBill from '../ItemFlatLists/ItemBill';
import { cancelBillOnServer, getBill, getBillDetail } from '../../service/Auth/UserService';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';

const productsData = [
    {
        id: '1',
        name: 'Sản phẩm 1',
        price: '100,000 VNĐ',
        quantity: 2,
    },
    {
        id: '2',
        name: 'Sản phẩm 2',
        price: '150,000 VNĐ',
        quantity: 1,
    },
    {
        id: '3',
        name: 'Sản phẩm 2',
        price: '150,000 VNĐ',
        quantity: 1,
    },
    // ... Add more products as needed
];

const BillDetail = (props) => {
    const navigation = useNavigation()
    const { idBill } = props.route.params
    const [item, setItem] = useState("")
    const [listItem, setListItem] = useState([])
    const dispatch = useDispatch()
    useEffect(() => {
        const getDetailBill = async () => {
            const fecthData = await getBillDetail(idBill)
            setItem(fecthData)
            setListItem(fecthData.billItem)
        }
        getDetailBill()
    }, [idBill])
    const { user } = useSelector((state) => state.auth)
    let totalItem = 0
    listItem.forEach((item) => totalItem += item.product.price * item.quantity)
    const handleCancelBill = async () => {
        const result = await cancelBillOnServer(idBill, user._id)
        dispatch(getBill(user._id))
        navigation.navigate("OrdersStack")
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={{ marginHorizontal: 10 }}>
                <UIHeader title='Chi Tiết Hóa Đơn' />
            </View>
            <ScrollView style={{ marginHorizontal: 10, }}>

                <View style={styles.content}>
                    <View style={styles.orderStatus}>
                        <Text style={styles.orderStatusLabel}>Trạng thái đơn hàng:</Text>
                        <Text style={[styles.orderStatusValue, getStatusStyle(item.status)]}>
                            {
                                item.status == 0 ? "Đã hủy" : item.status == 1 ? "Đã đặt hàng" : item.status == 2 ?
                                    "Đã xác nhận" : item.status == 3 ? "Đã giao hàng" :
                                        ""
                            }
                        </Text>
                    </View>
                    <View style={styles.shippingAddress}>
                        <Text style={styles.shippingLabel}>Địa chỉ giao hàng</Text>
                        <Text style={styles.name}>{item.name}</Text>
                        <Text style={styles.address}>{item.address}</Text>
                        <Text style={styles.phoneNumber}>SĐT: {item.phone}</Text>
                    </View>

                    <Text style={styles.title}>Danh sách sản phẩm</Text>
                    <FlatList
                        scrollEnabled={false}
                        data={listItem}
                        keyExtractor={(item) => item.product._id}
                        renderItem={({ item }) => <ItemBill item={item} />}
                    />

                    <View style={styles.paymentSummary}>
                        <View style={[styles.paymentSummaryRow]}>
                            <Text style={styles.paymentLabel}>Phương thức thanh toán:</Text>
                            <Text style={styles.paymentValue}>{item.payment}</Text>
                        </View>
                        <View style={styles.paymentSummaryRow}>
                            <Text style={styles.paymentLabel}>Tổng tiền hàng:</Text>
                            <Text style={styles.paymentValue}>{totalItem.toLocaleString('vi')} VNĐ</Text>
                        </View>
                        <View style={styles.paymentSummaryRow}>
                            <Text style={styles.paymentLabel}>Phí vận chuyển:</Text>
                            <Text style={styles.paymentValue}>{Number(30000).toLocaleString("vi")} VNĐ</Text>
                        </View>
                        <View style={styles.divider}></View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={styles.grandTotal}>Tổng thanh toán:</Text>
                            <Text style={styles.grandTotal}>{(totalItem + Number(30000)).toLocaleString('vi')} VNĐ</Text>
                        </View>
                    </View>
                </View>

            </ScrollView>
            {
                item.status == 1 ?
                    <View style={{ marginBottom: Platform.OS === 'android' ? 0 : 0 }}>
                        <UIButton
                            onPress={handleCancelBill}
                            title='Hủy đơn hàng'></UIButton>
                    </View>
                    : ""
            }


        </SafeAreaView >
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: StatusBar.currentHeight,
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    shippingAddress: {
        marginBottom: 20,
    },
    shippingLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    name: {
        fontSize: 16,
        color: '#555',
    },
    address: {
        fontSize: 16,
        color: '#555',
    },
    phoneNumber: {
        fontSize: 16,
        color: '#555',
    },
    orderStatus: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    orderStatusLabel: {
        fontSize: 16,
        color: '#333',
        fontWeight: 'bold',
        marginBottom: 5,
    },
    orderStatusValue: {
        fontSize: 16,
        color: '#555',
    },

    paymentSummary: {
        marginTop: 20,
        backgroundColor: '#F5F5F5',
        borderRadius: 10,
        padding: 20,
    },
    paymentSummaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    paymentLabel: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
    },
    paymentValue: {
        fontSize: 16,
        color: '#555',
    },
    divider: {
        borderBottomWidth: 0.5,
        borderColor: '#CCC',
        marginVertical: 5,
    },
    grandTotal: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 10,
    },
});

export default BillDetail;
