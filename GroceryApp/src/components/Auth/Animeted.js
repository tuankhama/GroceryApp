import { StyleSheet, Text, View, SafeAreaView, ScrollView, } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { Animated } from 'react-native';

const Thuas = () => {
    const animatedValue = useRef(new Animated.Value(0)).current;
    // useEffect(() => {
    //     Animated.timing(animatedValue, {
    //         toValue: 200,
    //         duration: 2000,
    //         useNativeDriver: false,
    //     }).start();
    // }, [animatedValue])


    return (
        <SafeAreaView>
            <Animated.View
                style={
                    {
                        backgroundColor: "red",
                        width: "100%",
                        height: 100,
                        marginLeft: 0,
                        opacity: animatedValue.interpolate({
                            inputRange: [0, 100],
                            outputRange: [1, 0]
                        })
                    }
                }
            ></Animated.View>

            <ScrollView onScroll={(e) => {
                animatedValue.setValue(e.nativeEvent.contentOffset.y);
            }}
                scrollEventThrottle={16}
            >
                <View style={{ height: 1000, backgroundColor: 'yellow' }}></View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Thuas

const styles = StyleSheet.create({})