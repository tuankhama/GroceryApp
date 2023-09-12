import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HomeNavigation from './HomeNavigation'
import UserNavigation from './UserNavigation'
import { useSelector } from 'react-redux'


const AppNavigation = () => {
    const user = useSelector((state) => state.auth.user)
    return user == null ? <UserNavigation /> : <HomeNavigation />
}

export default AppNavigation

const styles = StyleSheet.create({})