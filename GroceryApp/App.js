import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Home from './src/components/Home/Home'
import Ani from './src/components/Home/Animated'
import Category from './src/components/Home/Category'
import TopTab from './src/components/Home/TopTab/TopTab'
import { NavigationContainer } from '@react-navigation/native'
import Cart from './src/components/Home/Cart'
import DetailProduct from './src/components/Home/DetailProduct'
import Account from './src/components/Home/Account'
import Payment from './src/components/Home/Payment'
import NewAddress from './src/components/Home/NewAddress'
import Login from './src/components/Auth/Login'
import EditAddress from './src/components/Home/EditAddress'
import Address from './src/components/Home/Address'
import Oders from './src/components/Home/Oders'
import BillDetail from './src/components/Home/OderDetail'
import UserNavigation from './src/navigation/UserNavigation'
import HomeNavigation from './src/navigation/HomeNavigation'
import { Provider } from 'react-redux';
import store from './src/redux/store'
import Toast from 'react-native-toast-message';
import AppNavigation from './src/navigation/AppNavigation'
const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>

        <AppNavigation />
        <Toast />
      </NavigationContainer>

    </Provider>

  )
}

export default App

const styles = StyleSheet.create({})
