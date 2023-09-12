import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Splash from '../components/Auth/Splash';
import Welcome from '../components/Auth/Welcome';
import Register from '../components/Auth/Register';
import Login from '../components/Auth/Login';
import Test from '../components/Home/Test';
const Stack = createStackNavigator();
const UserNavigation = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            {/* <Stack.Screen name="Test" component={Test} /> */}

            <Stack.Screen name="Splash" component={Splash} />
            <Stack.Screen name="Welcome" component={Welcome} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
    )
}

export default UserNavigation

const styles = StyleSheet.create({})