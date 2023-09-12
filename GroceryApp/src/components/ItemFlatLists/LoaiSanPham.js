import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const LoaiSanPham = (props) => {

    const { item } = props.data;
    const navigation = useNavigation();
    return (
        <TouchableOpacity
            onPress={() => navigation.navigate("Category", {
                screen: "ProductStack",
                params: {
                    screen: item.name,
                    params: {
                        idCate: item._id
                    }
                },
            })}

            activeOpacity={0.8} style={styles.category}>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={{ uri: item.image }} />
            </View>
            <Text style={styles.name}>{item.name}</Text>
        </TouchableOpacity>
    );
};

export default LoaiSanPham;

const styles = StyleSheet.create({
    category: {
        marginHorizontal: 10,
        marginVertical: 10,
        width: Dimensions.get('window').width / 3 - 14.5,
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
    },
    image: {
        width: 100,
        resizeMode: 'contain',
        height: 100,
        borderRadius: 10,
    },
    name: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        textAlign: 'center',
    },
});
