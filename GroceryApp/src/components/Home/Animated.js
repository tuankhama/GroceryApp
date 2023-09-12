import React, { useState } from 'react';
import { ScrollView, View, TextInput, Text, StyleSheet, Animated } from 'react-native';

const Ani = () => {
    const [scrollY, setScrollY] = useState(new Animated.Value(0));

    const headerHeight = scrollY.interpolate({
        inputRange: [0, 100],
        outputRange: [150, 90],
        extrapolate: 'clamp',
    });

    const inputOpacity = scrollY.interpolate({
        inputRange: [0, 100],
        outputRange: [1, 0],
        extrapolate: 'clamp',
    });

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.header, { height: headerHeight }]}>
                <Animated.Text style={[styles.headerText, { opacity: inputOpacity }]}>MoMo Header</Animated.Text>
                <Animated.View style={[styles.inputContainer]}>
                    <TextInput style={styles.input} placeholder="Search" />
                </Animated.View>
            </Animated.View>

            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.contentContainer}
                scrollEventThrottle={16}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: false }
                )}
            >
                <View style={styles.content}>
                    <Text>thua</Text>
                    <Text>thua</Text>
                    <Text>thua</Text>
                    <Text>thua</Text>
                    <Text>thua</Text>
                    <Text>thua</Text>
                    <Text>thua</Text>
                    <Text>thua</Text>
                    <Text>thua</Text>
                    <Text>thua</Text>
                    <Text>thua</Text>
                    <Text>thua</Text>
                    <Text>thua</Text>
                    <Text>thua</Text>
                    <Text>thua</Text>
                    <Text>thua</Text>
                    <Text>thua</Text>
                    <Text>thua</Text>
                    <Text>thua</Text>
                    <Text>thua</Text>
                    <Text>thua</Text>
                    <Text>thua</Text>
                    <Text>thua</Text>
                    <Text>thua</Text>
                    <Text>thua</Text>
                    <Text>thua</Text>
                    <Text>thua</Text>
                    <Text>thua</Text>
                    <Text>thua</Text>
                    <Text>thua</Text>
                    <Text>thua</Text>
                    <Text>thua</Text>
                    <Text>thua</Text>
                    <Text>thua</Text>
                    <Text>thua</Text>
                    <Text>thua</Text>
                    <Text>thua</Text>
                    <Text>thua</Text>
                    <Text>thua</Text>
                    <Text>thua</Text>
                    <Text>thua</Text>
                    <Text>thua</Text>
                    <Text>thua</Text>
                    <Text>thua</Text>
                    <Text>thua</Text>
                    <Text>thua</Text>
                    <Text>thua</Text>
                    <Text>thua</Text>
                    <Text>thua</Text>
                    <Text>thua</Text>
                    <Text>thua</Text>
                    <Text>thua</Text>
                    <Text>thua</Text>
                    <Text>thua</Text>
                    <Text>thua</Text>
                    <Text>thua</Text>
                    <Text>thua</Text>
                    <Text>thua</Text>
                    <Text>thua</Text>
                    <Text>thua</Text>
                    <Text>thua</Text>
                    <Text>thua</Text>
                    <Text>thua</Text>
                    <Text>thua</Text>
                    <Text>thua</Text>
                    <Text>thua</Text>
                    <Text>thua</Text>
                    <Text>thua</Text>
                    <Text>thua</Text>
                    <Text>thua</Text>
                    <Text>thua</Text>
                    <Text>thua</Text>
                    <Text>thua</Text>
                    <Text>thua</Text>
                    <Text>thua</Text>
                    <Text>thua</Text>
                    <Text>thua</Text>
                    <Text>thua</Text>
                    <Text>thua</Text>
                    <Text>thua</Text>
                    <Text>thua</Text>
                    <Text>thua</Text>
                    <Text>thua</Text>
                    <Text>thua</Text>
                    <Text>thua</Text>
                    <Text>thua</Text>
                    <Text>thua</Text>
                    <Text>thua</Text>
                    <Text>thua</Text>
                    <Text>thua</Text>
                    <Text>thua</Text>
                    <Text>thua</Text>
                    <Text>thua</Text>
                    <Text>thua</Text>
                    <Text>thua</Text>
                    <Text>thua</Text>
                    {/* Nội dung */}
                    {/* ...Thêm các thành phần khác */}
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    header: {
        backgroundColor: '#1A73E8',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        overflow: 'hidden',
    },
    headerText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    inputContainer: {
        width: '80%',
        marginTop: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        paddingHorizontal: 10,
    },
    scrollView: {
        flex: 1,
        paddingTop: 200,
    },
    contentContainer: {
        paddingBottom: 20,
    },
    content: {
        padding: 20,
    },
    input: {
        height: 40,
    },
});

export default Ani;
