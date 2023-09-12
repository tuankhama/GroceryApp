import {
    Easing, StyleSheet, View, Image, Text,
    KeyboardAvoidingView, Platform, Keyboard, Animated, TouchableOpacity, StatusBar,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';
import UIHeader from '../UICustom/UIHeader';
import UIInput from '../UICustom/UIInput';
import color from '../styles/Colors';
import UIButton from '../UICustom/UIButton';
import useKeyboardAnimations from '../Animation/useKeyboardAnimations';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { login } from '../../service/Auth/UserService';
import { useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';
import { showToast } from '../UICustom/UIToast';
import { ValidateLogin } from '../../utils/Validation';
import UILoading from '../UICustom/UILoading';

const Login = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { isLoading } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    // animation khi ban phim mo
    const [heightComponent, setHeightComponent] = useState(new Animated.Value(150));
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

    // xu ly login
    const handlerLogin = () => {
        const validate = ValidateLogin(email, password)
        if (!validate) {
            return
        }
        const credential = {
            email: email,
            password: password,
        };
        dispatch(login(credential));
    };
    return (
        <SafeAreaView
            style={{
                backgroundColor: '#FFFFFF',
                flex: 1,
                paddingTop: StatusBar.currentHeight,
            }}>

            <View style={{ flex: 1, marginHorizontal: 10 }}>
                <View style={{ flex: 1 }}>
                    <UIHeader title="Đăng nhập" />
                </View>
                <Image
                    style={{
                        alignSelf: 'center',
                        flex: 3.5,
                        width: 300,
                        height: 300,
                    }}
                    source={require('../../media/images/bgSignIn.png')}
                />
                <KeyboardAvoidingView
                    style={{ flex: 3 }}
                    behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
                    <View style={{ flex: 1 }}>
                        <Text
                            numberOfLines={2}
                            style={styles.authTitle}
                        >
                            Nhập email và mật khẩu để truy cập vào tài khoản của bạn
                        </Text>
                        <UIInput
                            onFocus={handleInputFocus}
                            onBlur={handleInputBlur}
                            value={email}
                            onChangeText={setEmail}
                            placeholder="Nhập email"
                        />
                        <UIInput
                            onFocus={handleInputFocus}
                            onBlur={handleInputBlur}
                            value={password}
                            onChangeText={setPassword}
                            placeholder="Nhập mật khẩu"
                        />
                    </View>
                </KeyboardAvoidingView>
                <Animated.View style={{ height: heightComponent }}>
                    <UIButton
                        onPress={handlerLogin}
                        title="Đăng nhập"
                    />
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <Text style={styles.title}>Bạn chưa có tài khoản ? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                            <Text
                                style={[
                                    styles.title,
                                    {
                                        fontSize: 14,
                                        fontWeight: '500',
                                        color: color.title,
                                    },
                                ]}
                            >
                                Đăng ký
                            </Text>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            </View>

            <UILoading visible={isLoading}></UILoading>
        </SafeAreaView>
    );
};

export default Login;

const styles = StyleSheet.create({
    authTitle: {
        width: '80%',
        fontSize: 16,
        color: 'black',
        fontWeight: '600',
        marginBottom: 10,
    },
});
