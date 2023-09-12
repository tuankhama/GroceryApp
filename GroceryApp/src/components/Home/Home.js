import { FlatList, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View, Animated, Pressable } from 'react-native'
import React, { useState, useEffect } from 'react'
import UITitle from '../UICustom/UITitle'
import UISearch from '../UICustom/UISearch'
import color from '../styles/Colors'
import ItemSanPham from '../ItemFlatLists/ItemSanPham'
import { useNavigation } from '@react-navigation/native'
import { getAllCategories, getCart, getFavorite, getProductByIdCate } from '../../service/Home/HomeService'
import UILoading from '../UICustom/UILoading'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import LoaiSanPham from '../ItemFlatLists/LoaiSanPham'
import { getBill } from '../../service/Auth/UserService'

const Home = () => {
    const navigation = useNavigation();
    // animation 
    const [scrollY, setScrollY] = useState(new Animated.Value(0));

    const headerHeight = scrollY.interpolate({
        inputRange: [0, 100],
        outputRange: [140, 100],
        extrapolate: 'clamp',
    });
    const titleHeight = scrollY.interpolate({
        inputRange: [0, 100],
        outputRange: [45, 0],
    });
    const inputOpacity = scrollY.interpolate({
        inputRange: [0, 100],
        outputRange: [1, 0],
        extrapolate: 'clamp',
    });

    // data 
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth)
    const [dataFruits, setDataFruits] = useState("")
    const [dataMeats, setDataMeats] = useState("")
    const { data, isLoading } = useSelector((state) => state.categories)
    const { isLoading: cartIsLoading } = useSelector((state) => state.cart)
    // get category
    useEffect(() => {
        const getCate = async () => {
            dispatch(getAllCategories(data));
            const fruits = await getProductByIdCate("64cf491917735b776851c13c");
            setDataFruits(fruits)
            const meats = await getProductByIdCate("64cf496317735b776851c13e");
            setDataMeats(meats)
        }
        getCate()
        dispatch(getFavorite(user._id))
        dispatch(getCart(user._id))
        dispatch(getBill(user._id))
    }, [])

    return (

        <SafeAreaView style={{ flex: 1, paddingTop: StatusBar.currentHeight, backgroundColor: '#FFFFFF' }}>
            <Animated.View style={{
                height: headerHeight,
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 1,
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                overflow: 'hidden',
            }}>
                <Animated.View style={{ opacity: inputOpacity, height: titleHeight }}>
                    <UITitle title='Trang chủ'></UITitle>
                </Animated.View>

            </Animated.View>
            <ScrollView
                style={{ flex: 1, paddingTop: 100, }}
                contentContainerStyle={styles.contentContainer}
                scrollEventThrottle={16}
                onScroll={Animated.event(
                    [{
                        nativeEvent:
                            { contentOffset: { y: scrollY } }
                    }],
                    { useNativeDriver: false }
                )}
            >

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 24, marginVertical: 20, alignItems: 'center', }}>
                    <Text style={styles.loaiHang}>Các loại sản phẩm</Text>
                    <Pressable
                        onPress={() => navigation.navigate('Category')}

                    >
                        <Text style={styles.seeALL}>Xem tất cả</Text>
                    </Pressable>
                </View>
                <FlatList
                    style={{ height: 160 }}
                    contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
                    horizontal={true}
                    data={data}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item._id}
                    renderItem={(item) => <LoaiSanPham data={item} />}
                />


                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 24, marginVertical: 20, alignItems: 'center' }}>
                    <Text style={styles.loaiHang}>Trái cây</Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("Category", { screen: "ProductStack", params: { screen: "Trái cây" } })}

                        activeOpacity={0.8}
                    >
                        <Text style={styles.seeALL}>Xem tất cả</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    style={{ height: 220 }}
                    contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
                    horizontal={true}
                    data={dataFruits}
                    keyExtractor={(item) => item._id}
                    renderItem={(item) => <ItemSanPham item={item} />}
                />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 24, marginVertical: 20, alignItems: 'center' }}>
                    <Text style={styles.loaiHang}>Thịt</Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("Category", { screen: "ProductStack", params: { screen: "Thịt" } })}
                    >
                        <Text style={styles.seeALL}>Xem tất cả</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    style={{ height: 220, marginBottom: 100, }}
                    contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
                    horizontal={true}
                    data={dataMeats}
                    keyExtractor={(item) => item._id}
                    renderItem={(item) => <ItemSanPham item={item} />}
                />
            </ScrollView>
            <UILoading visible={cartIsLoading} />
            <UILoading visible={isLoading} />
        </SafeAreaView>

    )
}

export default Home

const styles = StyleSheet.create({
    loaiHang: {
        color: 'black',
        fontSize: 18,
        fontWeight: '700',
    },
    seeALL: {
        color: color.title,
        fontSize: 16,
    }
})
export const data = [
    {
        id: 1,
        image: 'https://img2.thuthuatphanmem.vn/uploads/2019/03/14/hinh-anh-qua-tao-do_095350722.jpg',
        name: 'Trái cây',
    },
    {
        id: 2,
        image: 'https://th.bing.com/th/id/R.020e38dc03a5fa3cd5000ac26d14a452?rik=K1GXIXJaNs6myw&riu=http%3a%2f%2ftraicayhatsay.com%2fupload%2fimages%2fnuoc-ep-dua-hau-330ml-nguyen-chat-juice-for-health.jpg&ehk=wzAJe9QS7p4kjMVhb5Xyx3oXNdnDylxY3SbyewNQvts%3d&risl=&pid=ImgRaw&r=0',
        name: 'Nước uống',
    },
    {
        id: 3,
        image: 'https://img2.thuthuatphanmem.vn/uploads/2019/03/14/hinh-anh-qua-tao-do_095350722.jpg',
        name: 'Kem',
    },
    {
        id: 4,
        image: 'https://img2.thuthuatphanmem.vn/uploads/2019/03/14/hinh-anh-qua-tao-do_095350722.jpg',
        name: 'Đồ ăn vặt',
    },
    {
        id: 5,
        image: 'https://img2.thuthuatphanmem.vn/uploads/2019/03/14/hinh-anh-qua-tao-do_095350722.jpg',
        name: 'Cà phê',
    },
    {
        id: 6,
        image: 'https://img2.thuthuatphanmem.vn/uploads/2019/03/14/hinh-anh-qua-tao-do_095350722.jpg',
        name: 'Trà',
    },
    {
        id: 7,
        image: 'https://img2.thuthuatphanmem.vn/uploads/2019/03/14/hinh-anh-qua-tao-do_095350722.jpg',
        name: 'Mứt kẹo',
    },
    {
        id: 8,
        image: 'https://img2.thuthuatphanmem.vn/uploads/2019/03/14/hinh-anh-qua-tao-do_095350722.jpg',
        name: 'Bánh mỳ',
    },
    {
        id: 9,
        image: 'https://img2.thuthuatphanmem.vn/uploads/2019/03/14/hinh-anh-qua-tao-do_095350722.jpg',
        name: 'Salad',
    },
    {
        id: 10,
        image: 'https://img2.thuthuatphanmem.vn/uploads/2019/03/14/hinh-anh-qua-tao-do_095350722.jpg',
        name: 'Nước ép',
    },
];
export const products = [
    {
        id: 1,
        image: "https://th.bing.com/th/id/R.020e38dc03a5fa3cd5000ac26d14a452?rik=K1GXIXJaNs6myw&riu=http%3a%2f%2ftraicayhatsay.com%2fupload%2fimages%2fnuoc-ep-dua-hau-330ml-nguyen-chat-juice-for-health.jpg&ehk=wzAJe9QS7p4kjMVhb5Xyx3oXNdnDylxY3SbyewNQvts%3d&risl=&pid=ImgRaw&r=0",
        name: "Cam",
        weight: "100g",
        price: "10,000"
    },
    {
        id: 2,
        image: "https://th.bing.com/th/id/R.020e38dc03a5fa3cd5000ac26d14a452?rik=K1GXIXJaNs6myw&riu=http%3a%2f%2ftraicayhatsay.com%2fupload%2fimages%2fnuoc-ep-dua-hau-330ml-nguyen-chat-juice-for-health.jpg&ehk=wzAJe9QS7p4kjMVhb5Xyx3oXNdnDylxY3SbyewNQvts%3d&risl=&pid=ImgRaw&r=0",
        name: "Ổi",
        weight: "200g",
        price: "20,000"
    },
    {
        id: 3,
        image: "https://th.bing.com/th/id/R.020e38dc03a5fa3cd5000ac26d14a452?rik=K1GXIXJaNs6myw&riu=http%3a%2f%2ftraicayhatsay.com%2fupload%2fimages%2fnuoc-ep-dua-hau-330ml-nguyen-chat-juice-for-health.jpg&ehk=wzAJe9QS7p4kjMVhb5Xyx3oXNdnDylxY3SbyewNQvts%3d&risl=&pid=ImgRaw&r=0",
        name: "Quít",
        weight: "300g",
        price: "30,000"
    },
    {
        id: 4,
        image: "https://th.bing.com/th/id/R.020e38dc03a5fa3cd5000ac26d14a452?rik=K1GXIXJaNs6myw&riu=http%3a%2f%2ftraicayhatsay.com%2fupload%2fimages%2fnuoc-ep-dua-hau-330ml-nguyen-chat-juice-for-health.jpg&ehk=wzAJe9QS7p4kjMVhb5Xyx3oXNdnDylxY3SbyewNQvts%3d&risl=&pid=ImgRaw&r=0",
        name: "Xoài",
        weight: "400g",
        price: "40,000"
    },
    {
        id: 5,
        image: "https://th.bing.com/th/id/R.020e38dc03a5fa3cd5000ac26d14a452?rik=K1GXIXJaNs6myw&riu=http%3a%2f%2ftraicayhatsay.com%2fupload%2fimages%2fnuoc-ep-dua-hau-330ml-nguyen-chat-juice-for-health.jpg&ehk=wzAJe9QS7p4kjMVhb5Xyx3oXNdnDylxY3SbyewNQvts%3d&risl=&pid=ImgRaw&r=0",
        name: "Dứa",
        weight: "500g",
        price: "50,000"
    },
    {
        id: 6,
        image: "https://th.bing.com/th/id/R.020e38dc03a5fa3cd5000ac26d14a452?rik=K1GXIXJaNs6myw&riu=http%3a%2f%2ftraicayhatsay.com%2fupload%2fimages%2fnuoc-ep-dua-hau-330ml-nguyen-chat-juice-for-health.jpg&ehk=wzAJe9QS7p4kjMVhb5Xyx3oXNdnDylxY3SbyewNQvts%3d&risl=&pid=ImgRaw&r=0",
        name: "Sầu riêng",
        weight: "600g",
        price: "60,000"
    },
    {
        id: 7,
        image: "https://th.bing.com/th/id/R.020e38dc03a5fa3cd5000ac26d14a452?rik=K1GXIXJaNs6myw&riu=http%3a%2f%2ftraicayhatsay.com%2fupload%2fimages%2fnuoc-ep-dua-hau-330ml-nguyen-chat-juice-for-health.jpg&ehk=wzAJe9QS7p4kjMVhb5Xyx3oXNdnDylxY3SbyewNQvts%3d&risl=&pid=ImgRaw&r=0",
        name: "Mít",
        weight: "700g",
        price: "70,000"
    },
    {
        id: 8,
        image: "https://th.bing.com/th/id/R.020e38dc03a5fa3cd5000ac26d14a452?rik=K1GXIXJaNs6myw&riu=http%3a%2f%2ftraicayhatsay.com%2fupload%2fimages%2fnuoc-ep-dua-hau-330ml-nguyen-chat-juice-for-health.jpg&ehk=wzAJe9QS7p4kjMVhb5Xyx3oXNdnDylxY3SbyewNQvts%3d&risl=&pid=ImgRaw&r=0",
        name: "Dâu",
        weight: "800g",
        price: "80,000"
    },
    {
        id: 9,
        image: "https://th.bing.com/th/id/R.020e38dc03a5fa3cd5000ac26d14a452?rik=K1GXIXJaNs6myw&riu=http%3a%2f%2ftraicayhatsay.com%2fupload%2fimages%2fnuoc-ep-dua-hau-330ml-nguyen-chat-juice-for-health.jpg&ehk=wzAJe9QS7p4kjMVhb5Xyx3oXNdnDylxY3SbyewNQvts%3d&risl=&pid=ImgRaw&r=0",
        name: "Măng cụt",
        weight: "900g",
        price: "90,000"
    },
    {
        id: 10,
        image: "https://th.bing.com/th/id/R.020e38dc03a5fa3cd5000ac26d14a452?rik=K1GXIXJaNs6myw&riu=http%3a%2f%2ftraicayhatsay.com%2fupload%2fimages%2fnuoc-ep-dua-hau-330ml-nguyen-chat-juice-for-health.jpg&ehk=wzAJe9QS7p4kjMVhb5Xyx3oXNdnDylxY3SbyewNQvts%3d&risl=&pid=ImgRaw&r=0",
        name: "Kiwi",
        weight: "1000g",
        price: "100,000"
    },
];






