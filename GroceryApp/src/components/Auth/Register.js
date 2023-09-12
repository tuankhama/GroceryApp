import React, { useEffect, useRef, useState } from 'react';
import {
    Easing, StyleSheet, View, Image, Text,
    KeyboardAvoidingView, Platform, Keyboard, Animated, TouchableOpacity
} from 'react-native';
import { SafeAreaView } from 'react-native';
import { StatusBar } from 'react-native';
import UIHeader from '../UICustom/UIHeader';
import UIInput from '../UICustom/UIInput';
import UIButton from '../UICustom/UIButton';
import useKeyboardAnimations from '../Animation/useKeyboardAnimations';
import color from '../styles/Colors';
import { useNavigation } from '@react-navigation/native';
import { register } from '../../service/Auth/UserService';
import { ValidateLogin } from '../../utils/Validation';
import UILoading from '../UICustom/UILoading';

const Register = () => {
    const navagation = useNavigation();

    // useState credential
    const [name, setName] = useState('Tuan');
    const [email, setEmail] = useState('tuantaps121999@gmail.com');
    const [password, setPassword] = useState('abc1234');
    const [isLoading, setIsLoading] = useState(false);
    // animation inputfocus
    const heightComponent = new Animated.Value(150);
    const handleInputFocus = () => {
        Platform.OS === 'android' && Animated.timing(heightComponent, {
            toValue: 0,
            duration: 500,
            useNativeDriver: false,
        }).start();
    }

    const handleInputBlur = () => {
        Platform.OS === 'android' && Animated.timing(heightComponent, {
            toValue: 150,
            duration: 500,
            useNativeDriver: false,
        }).start();
    }

    // handle Register
    const handlerRegister = async () => {
        setIsLoading(true);
        const validate = ValidateLogin(email, password, name)
        if (!validate) {
            return;
        }
        const credential = {
            name: name,
            email: email,
            password: password,
        }
        const result = await register(credential)
        if (result) {
            navagation.navigate("Login")
        }
        setIsLoading(false)
    }
    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: '#FFFFFF',

            paddingTop: StatusBar.currentHeight
        }}>
            <View style={{ flex: 1, marginHorizontal: 10 }}>
                <View style={{ flex: 1, }}>
                    <UIHeader title='Đăng ký' />
                </View>
                <Image style={{ alignSelf: 'center', flex: 4, width: 300, height: 300 }} source={require('../../media/images/Telephone.png')} />
                <KeyboardAvoidingView style={{ flex: 3 }} enabled={true} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
                    <View style={{ flex: 1 }}>
                        <UIInput
                            onFocus={handleInputFocus}
                            onBlur={handleInputBlur}
                            value={name}
                            onChangeText={setName}
                            placeholder="Nhập tên người dùng" />
                        <UIInput
                            onFocus={handleInputFocus}
                            onBlur={handleInputBlur}
                            value={email}
                            onChangeText={setEmail}
                            placeholder="Nhập email" />
                        <UIInput
                            onFocus={handleInputFocus}
                            onBlur={handleInputBlur}
                            value={password}
                            onChangeText={setPassword}
                            placeholder="Nhập mật khẩu" />
                    </View>
                </KeyboardAvoidingView>

                <Animated.View style={{ height: heightComponent, paddingTop: 40 }}>
                    <UIButton

                        onPress={handlerRegister}
                        title="Đăng ký" buttonStyle={{}}></UIButton>
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <Text style={styles.title}>Bạn đã có tài khoản ? </Text>
                        <TouchableOpacity onPress={() => navagation.navigate('Login')}>
                            <Text
                                style={[styles.title, {
                                    fontSize: 14, fontWeight: '500',
                                    color: color.title,
                                }]}
                            >Đăng nhập</Text>
                        </TouchableOpacity>
                    </View>

                </Animated.View>
            </View>
            <UILoading visible={isLoading} />
        </SafeAreaView >
    );
};

export default Register;

const styles = StyleSheet.create({
    title: {
        textAlign: 'center',
        color: '#7F7E7D'
    }
});
