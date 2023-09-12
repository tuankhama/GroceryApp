import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../components/Home/Home';
import Product from '../components/Home/Product';
import Category from '../components/Home/Category';
const Stack = createStackNavigator();
const CategoryStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="CategoryStack" component={Category} />
            <Stack.Screen name="ProductStack" component={Product} />


        </Stack.Navigator>
    )
}

export default CategoryStack

const styles = StyleSheet.create({})