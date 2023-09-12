import React, { useState, useEffect } from 'react';
import { StatusBar, StyleSheet, Text, View, SafeAreaView, KeyboardAvoidingView, ScrollView, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Keyboard, Platform, Animated } from 'react-native';

import UIHeader from '../UICustom/UIHeader';
import UIInput from '../UICustom/UIInput';
import UIButton from '../UICustom/UIButton';
import color from '../styles/Colors';
import { Pressable } from 'react-native';
import { useSelector } from 'react-redux';
import { getDetailAddress, updateAddressOnServer } from '../../service/Home/HomeService';
import { ValidateAddress } from '../../utils/Validation';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';

const API_URL = 'https://provinces.open-api.vn/api/?depth=3';

const EditAddress = (props) => {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const [data, setData] = useState([]);
    const [selectedProvide, setSelectedProvide] = useState(null);
    const [dataDistricts, setDataDistricts] = useState([]);
    const [selectedDistricts, setSelectedDistricts] = useState(null);
    const [dataWards, setDataWards] = useState([]);
    const [selectedWards, setSelectedWards] = useState(null);
    const [isInputFocused, setInputFocused] = useState(true);
    const { idAddress } = props.route.params
    const { user } = useSelector((state) => state.auth)
    const [detailAddress, setDetailAddress] = useState("")
    const [phone, setPhone] = useState("")
    const [name, setName] = useState("")

    const [componentHeight, setComponentHeight] = useState(new Animated.Value(200));
    const [isFocusInput, setIsFocusInput] = useState(false);
    const [selectedCityName, setSelectedCityName] = useState('');
    const [selectedDistrictsName, setSelectedDistrictsName] = useState('');
    const [selectedWardsName, setSelectedWardsName] = useState('');
    const [isPickerVisible, setPickerVisible] = useState(true);

    useEffect(() => {

        const getDetail = async () => {
            const response = await getDetailAddress(user._id, idAddress)
            setDetailAddress(response[0].detailAddress)
            setName(response[0].name)
            setPhone(response[0].phone)
            const addressString = response[0].address
            const addressParts = addressString.split(', ').map(part => part.trim());
            const province = addressParts[0];
            const district = addressParts[1]
            const commune = addressParts[2]
            if (province) {
                setSelectedCityName(province);
            }
            setSelectedDistrictsName(district)
            setSelectedWardsName(commune)

        }
        getDetail()
    }, [idAddress]);

    useEffect(() => {
        fetchData()
    }, [])
    const fetchData = async () => {
        try {
            const response = await fetch(API_URL);
            const jsonData = await response.json();
            setData(jsonData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {

        const selectedProvinceData = data.find(item => item.name === selectedCityName);
        setSelectedProvide(selectedProvinceData?.code)
        if (selectedProvinceData) {
            setDataDistricts(selectedProvinceData.districts);
            setSelectedDistricts(null);
            setSelectedWards(null);
        }

    }, [selectedCityName]);

    useEffect(() => {
        const selectedDistrictData = dataDistricts.find(item => item.name === selectedDistrictsName);
        setSelectedDistricts(selectedDistrictData?.code)
        if (selectedDistrictData) {
            setDataWards(selectedDistrictData.wards);
            setSelectedWards(null);
        }

    }, [selectedDistrictsName]);

    useEffect(() => {
        const selectedWardsData = dataWards.find(item => item.name === selectedWardsName);
        setSelectedWards(selectedWardsData?.code)
    }, [selectedWardsName]);
    const handleUpdate = async () => {
        const validate = ValidateAddress(name, phone, selectedCityName, selectedDistrictsName, selectedWardsName, detailAddress)
        const address = selectedCityName + ", " + selectedDistrictsName + ", " + selectedWardsName
        if (validate) {
            dispatch(updateAddressOnServer(user._id, idAddress, name, phone, address, detailAddress))
            setSelectedCityName("")
            setSelectedProvide(null)
            setSelectedWards(null)
            setSelectedDistricts(null)
            setSelectedDistrictsName("")
            setSelectedWardsName("")
            setName("")
            setPhone("")

            navigation.navigate("AddressStack")
        }

    }

    const handleInputFocus = () => {
        setIsFocusInput(true);
        Animated.timing(componentHeight, {
            toValue: 0,
            duration: 500,
            useNativeDriver: false,
        }).start();

    };

    const handleInputBlur = () => {
        setIsFocusInput(false);
        Animated.timing(componentHeight, {
            toValue: 200,
            duration: 200,
            useNativeDriver: false,
        }).start();


    };

    const setActivePiker = () => {
        setPickerVisible(true);
        setSelectedCityName(null);
        setSelectedProvide(null);
        setSelectedDistricts(null);
        setSelectedWards(false);

    }
    const setActiveDistrict = () => {
        setSelectedDistricts(false);
        setSelectedWards(false);
    }
    const setActiveWard = () => {
        setSelectedWards(false);
    }
    useEffect(() => {
        const selectedCity = data.find(item => item.code === selectedProvide);
        if (selectedCity) {
            setPickerVisible(false);
            setSelectedCityName(selectedCity.name);
        }
        const selectedDistrict = dataDistricts.find(item => item.code === selectedDistricts)
        if (selectedDistrict) {
            setSelectedDistrictsName(selectedDistrict.name);
        }
        const selectedWard = dataWards.find(item => item.code === selectedWards)
        if (selectedWard) {
            setSelectedWardsName(selectedWard.name);
        }
    }, [selectedProvide, selectedDistricts, selectedWards])
    const renderAddress = (Component) => {

        return (
            <Component>
                {
                    isPickerVisible || Platform.OS === 'android' ?
                        <View style={styles.pickerContainer}>
                            <Picker
                                selectedValue={selectedProvide}
                                onValueChange={(itemValue) => setSelectedProvide(itemValue)}
                            >
                                <Picker.Item style={styles.pickerItem} label="Chọn Tỉnh/Thành phố" value={null} />
                                {data.map(item => (
                                    <Picker.Item key={item.code} label={item.name} value={item.code} />
                                ))}
                            </Picker>
                        </View>
                        : Platform.OS === 'ios' &&
                        <Pressable
                            onPress={setActivePiker}
                            style={{
                                height: 50,
                                borderRadius: 10,
                                backgroundColor: color.textInput,
                                paddingLeft: 10,
                                marginVertical: 5,
                                justifyContent: 'center',
                            }}>
                            <Text>
                                {selectedCityName}
                            </Text>
                        </Pressable >


                }
                {
                    selectedProvide && !selectedDistricts || (Platform.OS === 'android' && selectedProvide) ? (
                        <View style={styles.pickerContainer}>
                            <Picker
                                selectedValue={selectedDistricts}
                                onValueChange={(itemValue) => {
                                    setSelectedDistricts(itemValue);
                                    setSelectedWards(null);
                                }}
                            >
                                <Picker.Item style={styles.pickerItem} label="Chọn Quận/Huyện" value={null} />
                                {dataDistricts.map(item => (
                                    <Picker.Item key={item.code} label={item.name} value={item.code} />
                                ))}
                            </Picker>
                        </View>
                    ) : selectedDistricts && Platform.OS === 'ios' && (
                        <Pressable
                            onPress={setActiveDistrict} // Giả sử setActivePicker là một hàm bạn đã định nghĩa
                            style={{
                                height: 50,
                                borderRadius: 10,
                                backgroundColor: color.textInput,
                                paddingLeft: 10,
                                marginVertical: 5,
                                justifyContent: 'center',
                            }}>
                            <Text>
                                {selectedDistrictsName} {/* Giả sử selectedDistrictsName là biến bạn đã định nghĩa */}
                            </Text>
                        </Pressable>
                    )

                }

                {
                    (selectedDistricts && !selectedWards) || (selectedDistricts && Platform.OS === 'android') ? (
                        <View style={styles.pickerContainer}>
                            <Picker
                                selectedValue={selectedWards}
                                onValueChange={(itemValue) => setSelectedWards(itemValue)}
                            >
                                <Picker.Item style={styles.pickerItem} label="Chọn Phường/Xã" value={null} />
                                {dataWards.map(item => (
                                    <Picker.Item key={item.code} label={item.name} value={item.code} />
                                ))}
                            </Picker>
                        </View>
                    ) : selectedWards && Platform.OS === 'ios' && (
                        <Pressable
                            onPress={setActiveWard}
                            style={{
                                height: 50,
                                borderRadius: 10,
                                backgroundColor: color.textInput,
                                paddingLeft: 10,
                                marginVertical: 5,
                                justifyContent: 'center',
                            }}>
                            <Text>
                                {selectedWardsName}
                            </Text>
                        </Pressable>
                    )
                }

                {
                    <UIInput placeholder="Tên đường, Tòa nhà, Số nhà."
                        value={detailAddress}
                        onChangeText={setDetailAddress}
                        onBlur={handleInputBlur}
                        onFocus={handleInputFocus} />
                }
            </Component >
        )
    }

    return (
        <SafeAreaView style={[styles.container, { paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }]}>
            <View style={{ marginHorizontal: 10 }}>
                <UIHeader title="Sửa địa chỉ" />

                <Animated.View style={{ height: componentHeight }}>
                    {isFocusInput ? null :
                        <View>
                            <Text style={styles.contact}>Liên hệ: <Text style={{ color: 'red' }}>*</Text></Text>
                            <UIInput
                                value={name}
                                onChangeText={setName}
                                placeholder='Họ và tên' />
                            <UIInput
                                value={phone}
                                onChangeText={setPhone}
                                placeholder='Số điện thoại' />
                        </View>
                    }
                </Animated.View>
                <Text style={styles.contact}>Địa chỉ: <Text style={{ color: 'red' }}>*</Text></Text>
            </View>

            <View style={{ justifyContent: 'space-between', flex: 1, marginHorizontal: 10 }}>
                {renderAddress(Platform.OS === 'android' ? View : View)}
                <UIButton
                    onPress={handleUpdate}
                    title="Hoàn thành" />
            </View>


        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: Platform.OS === 'android' ? 24 : 0,
        backgroundColor: '#FFFFFF',
    },
    contact: {
        marginTop: 30,
        marginBottom: 10,

    },
    pickerContainer: {
        borderRadius: 10,
        backgroundColor: Platform.OS === 'android' ? color.textInput : null,
        height: Platform.OS === 'android' ? 50 : null,
        marginBottom: 20,
    },
    pickerItem: {
        color: '#706B67'
    }
});

export default EditAddress;
