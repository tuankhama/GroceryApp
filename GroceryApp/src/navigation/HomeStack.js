import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Splash from '../components/Auth/Splash';
import Welcome from '../components/Auth/Welcome';
import Register from '../components/Auth/Register';
import Login from '../components/Auth/Login';
import Home from '../components/Home/Home';
import DetailProduct from '../components/Home/DetailProduct';
import SeletedAddress from '../components/Home/SeletedAddress';
const Stack = createStackNavigator();
const HomeStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="HomeStack" component={Home} />
            <Stack.Screen name="DetailStack" component={DetailProduct} />
            <Stack.Screen name="SeletedAddressStack" component={SeletedAddress} />

        </Stack.Navigator>
    )
}

export default HomeStack

const styles = StyleSheet.create({})