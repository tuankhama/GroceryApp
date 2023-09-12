import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { setProducts } from '../../redux/home/productSlice'; // Import các action từ slice
import { setProductDetail } from '../../redux/home/productDetailSlice'; // Import các action từ slice

import { getAllProduct, getDetailProduct } from '../../service/Home/HomeService';
import { TouchableOpacity } from 'react-native';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    productDetailContainer: {
        marginBottom: 20,
    },
    productName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    productDescription: {
        fontSize: 16,
        marginBottom: 16,
    },
    productPrice: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    productList: {
        marginTop: 20,
    },
    productItem: {
        marginBottom: 10,
        padding: 10,
        backgroundColor: '#f0f0f0',
    },
    productItemName: {
        fontSize: 18,
    },
});

const YourComponent = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products);
    const productDetail = useSelector((state) => state.productDetail);
    const [selectedProductId, setSelectedProductId] = useState(null);
    useEffect(() => {
        // Gọi API để lấy danh sách sản phẩm
        getAllProduct()
            .then((data) => {
                dispatch(setProducts(data));
            })
            .catch((error) => {
                console.error('Error fetching product list:', error);
            });
    }, []);

    useEffect(() => {
        if (selectedProductId !== null) {
            // Gọi API để lấy chi tiết sản phẩm
            getDetailProduct(selectedProductId)
                .then((data) => {
                    dispatch(setProductDetail(data));
                })
                .catch((error) => {
                    console.error('Error fetching product detail:', error);
                });
        }
    }, [selectedProductId]);

    const selectProduct = (productId) => {
        setSelectedProductId(productId);
    };

    return (
        <View style={styles.container}>
            <View style={styles.productDetailContainer}>
                <Text style={styles.productName}>{productDetail.name}</Text>
                <Text style={styles.productDescription}>{productDetail.description}</Text>
                <Text style={styles.productPrice}>{productDetail.price} VNĐ</Text>
            </View>

            <FlatList
                data={products}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => selectProduct(item._id)}>
                        <View style={styles.productItem}>
                            <Text style={styles.productItemName}>{item.name}</Text>
                        </View>
                    </TouchableOpacity>
                )}
                style={styles.productList}
            />
        </View>
    );
};

export default YourComponent;
