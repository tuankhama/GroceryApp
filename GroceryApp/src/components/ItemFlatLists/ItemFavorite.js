import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import { useDispatch } from 'react-redux';
import { addItemToCart, removeFavorite } from '../../service/Home/HomeService';
import { useSelector } from 'react-redux';



export const RenderHiddenItem = props => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth)

    const handleDeleteItem = (idProduct) => {
        dispatch(removeFavorite(user._id, idProduct));
    }
    const { item } = props.data;
    return (
        <TouchableOpacity onPress={() => handleDeleteItem(item._id)} style={styles.deleteButton}>
            <Image style={{ width: 30, height: 30 }} source={require('../../media/images/remove.png')}></Image>
        </TouchableOpacity>
    );
};


export const RenderSwipeableItem = props => {
    const { item } = props.data;
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth)
    return (

        <TouchableOpacity>
            <View style={styles.item}>
                <Image style={styles.imageIcon} source={{ uri: item.image }}></Image>
                <View style={{ flex: 1, }}>
                    <Text style={styles.textTitle}>{item.name}</Text>
                    <View style={{
                        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'
                        ,
                    }}>
                        <TouchableOpacity
                            onPress={() => dispatch(addItemToCart(user._id, item._id))}

                            style={styles.containerTong}>
                            <Image style={styles.imageIconCart} source={require('../../media/images/shopcart.png')}></Image>
                            <Text style={{
                                color: '#FF5E00',
                                fontSize: 14,

                                fontWeight: '400'
                            }}>Add to cart</Text>
                        </TouchableOpacity>
                        <Text style={styles.mass}>{item.mass}</Text>
                    </View>

                </View>

            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    container: {
        padding: 20,

    },
    item: {
        flexDirection: 'row',
        height: 100,
        alignItems: 'center',
        paddingHorizontal: 16,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 0.2,
        borderBottomColor: '#6D3805'
    },
    text: {
        fontSize: 16,
    },
    deleteButton: {
        height: 100,
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingRight: 16,
        backgroundColor: '#cb2027',

    },
    imageIconCart: {
        height: 21,
        width: 21,
    },
    imageIcon: {
        height: 90,
        width: 90,
        borderRadius: 20,
        resizeMode: 'contain',
    },
    textTitle: {
        marginLeft: 25,
        color: 'black',
        fontSize: 18,

        fontWeight: '700',
    },
    textQuantity: {
        // 2
        color: '#6D3805',
        fontSize: 18,
        fontFamily: 'Klarna Headline',
        fontWeight: '400',
    },
    imageQuantity: {
        width: 15,
        height: 15,
    },
    containerQuantity: {
        backgroundColor: '#FFFFFF',
        borderRadius: 50,
        height: 25,
        width: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerTong: {
        flexDirection: 'row', height: 30,

        justifyContent: 'space-between',
        width: 100,
        paddingHorizontal: 2,
        alignItems: 'center',
        borderRadius: 50,
        marginLeft: 50,
        marginTop: 10,
    },
    mass: {
        color: '#6D3805',
        fontSize: 18,

        fontWeight: '400',
    },
    titleText: {
        color: "#FF5E00",
        fontSize: 24,
        fontStyle: 'normal',
        fontWeight: '700',
        textAlign: 'center',

        marginTop: 5,
    },
});
