import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import React from 'react'

import Fish from './Fish';
import Fruit from './Fruit';
import Icecream from './Icecream';
import Juice from './Juice';
import Meat from './Meat';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
const Tab = createMaterialTopTabNavigator();
const TopTab = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarIndicatorStyle: { backgroundColor: '#3DAB55' },
                tabBarItemStyle: {
                    width: 99,
                    height: 45,
                    borderRadius: 5,
                },
                tabBarLabelStyle: {
                    fontSize: 14,
                    fontWeight: '500',
                    textTransform: 'none'

                },
                tabBarActiveTintColor: "#3DAB55",
                tabBarInactiveTintColor: "#7A7A7A",
                tabBarScrollEnabled: true,
            }}
        >
            <Tab.Screen name="Trái cây" component={Fruit} />
            <Tab.Screen name="Cá" component={Fish} />
            <Tab.Screen name="Thịt" component={Meat} />
            <Tab.Screen name="Kem" component={Icecream} />
            <Tab.Screen name="Nước ép" component={Juice} />
        </Tab.Navigator>


    )
}

export default TopTab

const styles = StyleSheet.create({})