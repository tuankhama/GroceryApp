import { StyleSheet, Text, View, SafeAreaView, FlatList, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import UITitle from '../UICustom/UITitle';
import { StatusBar } from 'react-native';
import UISearch from '../UICustom/UISearch';
import { data } from './Home';
import LoaiSanPham from '../ItemFlatLists/LoaiSanPham';
import UILoading from '../UICustom/UILoading';
import { getAllCategories } from '../../service/Home/HomeService';
import { useSelector } from 'react-redux';
const Category = () => {
    // loading
    const { data, isLoading } = useSelector((state) => state.categories)
    // Trạng thái cho truy vấn tìm kiếm và dữ liệu đã lọc
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState(data);

    // Hàm để lọc dữ liệu dựa trên truy vấn tìm kiếm
    const filterData = (query) => {
        const filtered = data.filter((item) =>
            item.name.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredData(filtered);
    };

    // Cập nhật dữ liệu đã lọc khi truy vấn tìm kiếm thay đổi
    useEffect(() => {
        filterData(searchQuery);
    }, [searchQuery]);
    return (
        <SafeAreaView style={{ flex: 1, paddingTop: StatusBar.currentHeight, backgroundColor: '#FFFFFF' }}>

            <UITitle title='Các loại sản phẩm'></UITitle>
            <UISearch
                style={styles.searchInput}
                placeholder="Tìm kiếm sản phẩm"
                onChangeText={(text) => setSearchQuery(text)}
                value={searchQuery}
            ></UISearch>
            <FlatList
                style={{ marginTop: 15, }}
                data={filteredData}
                numColumns={3}
                keyExtractor={(item) => item._id}
                renderItem={(item) => <LoaiSanPham data={item} />}
            >
            </FlatList>

            <UILoading visible={isLoading} />

        </SafeAreaView>
    )
}

export default Category

const styles = StyleSheet.create({

})