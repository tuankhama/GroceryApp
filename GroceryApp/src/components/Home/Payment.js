import React, { useEffect, useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Image, Text, View, TouchableOpacity, Platform } from 'react-native';
import UIHeader from '../UICustom/UIHeader';
import UIButton from '../UICustom/UIButton';
import { ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { getCart, getDetailAddress } from '../../service/Home/HomeService';
import { addBillOnServer, getBill } from '../../service/Auth/UserService';
import { ValidatePayments } from '../../utils/Validation';
import { useDispatch } from 'react-redux';
import { removeCart } from '../../redux/home/cartSlice';

const Payment = (props) => {
    const idAddress = props.route.params?.idAddress

    const navigation = useNavigation();
    const addresses = useSelector((state) => state.address.addresses);
    const { user } = useSelector((state) => state.auth);
    const { cart } = useSelector((state) => state.cart);
    const [totalItems, setTotalItems] = useState(0)
    const [totalPayments, setTotalPayments] = useState(0)
    const [address, setAddress] = useState("")
    const [detail, setDetail] = useState("");
    const [phone, setPhone] = useState("");
    const [name, setName] = useState("");
    const [detailAddress, setDetailAddress] = useState("");
    const dispatch = useDispatch()
    useEffect(() => {

        const getDetail = async () => {
            const result = await getDetailAddress(user._id, idAddress);
            setDetail(result[0]);
            setAddress(result[0]?.address)
            setPhone(result[0]?.phone)
            setName(result[0]?.name)
            setDetailAddress(result[0]?.detailAddress)
        };
        getDetail();


    }, [idAddress]);
    useEffect(() => {
        let totalItem = 0
        cart.forEach(item => {
            totalItem += Number(item.product.price) * Number(item.quantity)
        });
        setTotalItems(totalItem)
        setTotalPayments(totalItem + 30000)
    }, [cart]);

    const handleOrder = async () => {
        const validateForm = ValidatePayments(address, cart)
        if (validateForm) {
            dispatch(addBillOnServer(user._id, address, "Tiền mặt", phone, name))
            dispatch(removeCart())
            navigation.navigate("CartStack")
        }
    }
    return (
        <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
            <SafeAreaView style={styles.container}>
                <UIHeader
                    onPress={() => navigation.navigate("CartStack")}
                    title='Thanh Toán' />
                <ScrollView>

                    <TouchableOpacity
                        onPress={() => navigation.navigate("SeletedAddressStack")}
                        activeOpacity={0.8} style={styles.addressContainer}>
                        <View style={styles.addressInfo}>
                            <Image style={styles.icon} source={require('../../media/images/location.png')} />
                            {
                                !idAddress && idAddress !== 0 ?
                                    <View>
                                        <Text style={[styles.contactDetail, { marginLeft: 16, fontSize: 14 }]} >Chọn địa chỉ giao hàng</Text>
                                    </View>
                                    :
                                    <View style={styles.contact}>
                                        <Text style={styles.contactTitle}>Địa chỉ nhận hàng</Text>
                                        <Text style={styles.contactDetail}>{detail?.name} | {detail?.phone}</Text>
                                        <Text style={styles.contactDetail}>{detail?.detailAddress}</Text>
                                        <Text style={styles.contactDetail}>{detail?.address}</Text>
                                    </View>

                            }



                        </View>
                        <Image source={require('../../media/images/icon.png')} />
                    </TouchableOpacity>

                    <TouchableOpacity

                        onPress={() => navigation.navigate("ItemStack")}
                        activeOpacity={0.8} style={styles.itemContainer}>
                        <View style={styles.itemInfo}>
                            <Image style={[styles.icon, { width: 30, height: 30 }]} source={require('../../media/images/bag.png')} />
                            <Text style={styles.seeItem}>Xem sản phẩm</Text>
                        </View>
                        <Image source={require('../../media/images/icon.png')} />
                    </TouchableOpacity>

                    <View style={styles.paymentMethod}>
                        <TouchableOpacity activeOpacity={0.8} style={[styles.paymentOption, { borderBottomWidth: 0.2 }]}>
                            <Image style={styles.paymentIcon} source={require('../../media/images/money.png')} />
                            <Text style={styles.paymentText}>Thanh toán bằng tiền mặt</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8} style={styles.paymentOption}>
                            <Image style={[styles.paymentIcon, { height: 50 }]} source={require('../../media/images/momo.png')} />
                            <Text style={styles.paymentText}>Thanh toán qua MoMo</Text>
                        </TouchableOpacity>
                    </View>


                    <View style={styles.detailPayment}>
                        <View style={styles.totalItem}>
                            <Text style={styles.totalText}>Tổng tiền hàng</Text>
                            <Text style={styles.totalText}>{totalItems.toLocaleString("vi")}</Text>
                        </View>
                        <View style={styles.totalItem}>
                            <Text style={styles.totalText}>Phí vận chuyển</Text>
                            <Text style={styles.totalText}>{Number(30000).toLocaleString("vi")}</Text>
                        </View>
                        <View style={{ borderBottomWidth: 0.4 }}></View>
                        <View style={styles.totalItem}>
                            <Text style={styles.totalPayment}>Tổng thanh toán</Text>
                            <Text style={styles.totalPrice}>{totalPayments.toLocaleString("vi")}</Text>
                        </View>

                    </View>
                </ScrollView>

                <View style={{ marginBottom: Platform.OS === 'android' ? 14 : 0 }}>
                    <UIButton
                        onPress={handleOrder}
                        title='Đặt hàng'></UIButton>
                </View>
            </SafeAreaView>
        </View >

    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: StatusBar.currentHeight,
        flex: 1,
        backgroundColor: '#FFFFFF',
        marginHorizontal: 10
    },
    icon: {
        height: 24,
        width: 24,
    },
    addressContainer: {
        backgroundColor: '#F5F5F5',
        borderRadius: 10,
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
    },
    addressInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    contact: {
        marginLeft: 16,
    },
    contactTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },
    contactDetail: {
        fontSize: 16,
        color: '#555',
        marginBottom: 2,
    },
    itemContainer: {
        flexDirection: 'row',
        height: 80,
        backgroundColor: '#F5F5F5',
        marginVertical: 10,
        padding: 20,
        borderRadius: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    itemInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    seeItem: {
        fontSize: 16,
        color: '#333',
        marginLeft: 8,
        fontWeight: 'bold',
    },
    paymentMethod: {
        backgroundColor: '#F5F5F5',
        borderRadius: 10,
        padding: 15,

    },
    paymentOption: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    paymentIcon: {
        height: 50,
        width: 50,
        marginRight: 10,
    },
    paymentText: {
        fontSize: 14,
        color: '#333',
        fontWeight: '500',
    },
    totalPayment: {
        fontSize: 16,
        color: '#333',
        fontWeight: 'bold',
    },
    totalItem: {
        flexDirection: 'row',
        borderRadius: 10,
        // backgroundColor: 'red',
        marginVertical: 5,
        padding: 10,
        justifyContent: 'space-between',
    },
    detailPayment: {
        backgroundColor: '#F5F5F5',
        padding: 10,
        marginVertical: 10,
        borderRadius: 10,
    },
    totalText: {
        fontSize: 14,
        color: '#333',
        fontWeight: '500',
    },
    totalPrice: {
        fontSize: 18,
        color: '#333',
        fontWeight: 'bold',
    }
});

export default Payment;
