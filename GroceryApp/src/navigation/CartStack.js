import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Splash from '../components/Auth/Splash';
import Welcome from '../components/Auth/Welcome';
import Register from '../components/Auth/Register';
import Login from '../components/Auth/Login';
import Home from '../components/Home/Home';
import DetailProduct from '../components/Home/DetailProduct';
import Cart from '../components/Home/Cart';
import Payment from '../components/Home/Payment';
import Item from '../components/Home/Item';
const Stack = createStackNavigator();
const CartStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="CartStack" component={Cart} />
            <Stack.Screen name="PaymentStack" component={Payment} />
            <Stack.Screen name="ItemStack" component={Item} />

        </Stack.Navigator>
    )
}

export default CartStack

const styles = StyleSheet.create({})