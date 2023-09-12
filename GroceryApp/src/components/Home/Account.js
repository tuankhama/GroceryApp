import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import UIHeader from '../UICustom/UIHeader';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/auth/authSlice';

const ProfileScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(logout());
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={{ marginHorizontal: 10 }}>
                <UIHeader title="Thông tin cá nhân" />
                <View style={{ marginBottom: 20, }}></View>


                <TouchableOpacity
                    onPress={() => navigation.navigate("OrdersStack")}
                    activeOpacity={0.8} style={styles.optionContainer}>
                    <Image source={require('../../media/images/orders.png')} style={styles.optionIcon} />
                    <Text style={styles.optionText}>Đơn hàng</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => navigation.navigate("AddressStack")}

                    activeOpacity={0.8} style={styles.optionContainer}>
                    <Image source={require('../../media/images/location.png')} style={styles.optionIcon} />
                    <Text style={styles.optionText}>Địa chỉ</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => navigation.navigate("ChangePassStack")}

                    activeOpacity={0.8} style={styles.optionContainer}>
                    <Image source={require('../../media/images/password.png')} style={styles.optionIcon} />
                    <Text style={styles.optionText}>Đổi mật khẩu</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={handleLogout}
                    style={styles.logoutButton}>
                    <Image source={require('../../media/images/logout.png')} style={styles.logoutIcon} />
                    <Text style={styles.logoutText}>Đăng xuất</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingVertical: StatusBar.currentHeight,
    },
    profileContainer: {
        alignItems: 'center',
        marginBottom: 30,
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 10,
    },
    username: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 10,
        color: '#333',
    },
    optionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    optionIcon: {
        width: 30,
        height: 30,
        marginRight: 15,
    },
    optionText: {
        fontSize: 18,
        color: '#333',
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logoutIcon: {
        width: 30,
        height: 30,
        marginRight: 15,
        tintColor: '#e74c3c',
    },
    logoutText: {
        fontSize: 18,
        color: '#e74c3c',
    },
});

export default ProfileScreen;
