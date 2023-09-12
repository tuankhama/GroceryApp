import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Splash from '../components/Auth/Splash';
import Welcome from '../components/Auth/Welcome';
import Register from '../components/Auth/Register';
import Login from '../components/Auth/Login';
import Home from '../components/Home/Home';
import Oders from '../components/Home/Oders';
import Account from '../components/Home/Account';
import Address from '../components/Home/Address';
import NewAddress from '../components/Home/NewAddress';
import EditAddress from '../components/Home/EditAddress';
import ChangePass from '../components/Home/ChangePass';
import OderDetail from '../components/Home/OderDetail';
const Stack = createStackNavigator();
const AccountStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="AccountStack" component={Account} />
            <Stack.Screen name="OrdersStack" component={Oders} />
            <Stack.Screen name="OderDetailStack" component={OderDetail} />
            <Stack.Screen name="AddressStack" component={Address} />
            <Stack.Screen name="NewAddressStack" component={NewAddress} />
            <Stack.Screen name="EditAddressStack" component={EditAddress} />
            <Stack.Screen name="ChangePassStack" component={ChangePass} />

        </Stack.Navigator>
    )
}

export default AccountStack

const styles = StyleSheet.create({})