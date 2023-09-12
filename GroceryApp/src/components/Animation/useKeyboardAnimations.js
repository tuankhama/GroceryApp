import { useEffect, useState } from 'react';
import { Keyboard, Platform } from 'react-native';
import { Animated } from 'react-native';

const useKeyboardAnimations = (valueCurrent, showValue, hideValue, duration) => {
    const animatedValue = new Animated.Value(valueCurrent);

    useEffect(() => {
        const showKey = Keyboard.addListener('keyboardDidShow', () => {
            if (Platform.OS === 'android') {
                Animated.timing(animatedValue, {
                    toValue: showValue,
                    duration: duration,
                    useNativeDriver: false,
                }).start();
            }
        });

        const hideKey = Keyboard.addListener('keyboardDidHide', () => {
            Animated.timing(animatedValue, {
                toValue: hideValue,
                duration: duration,
                useNativeDriver: false,
            }).start();
        });

        // Cleanup by removing listeners when unmounting
        return () => {
            showKey.remove();
            hideKey.remove();
        };
    }, []);

    return animatedValue;
};

export default useKeyboardAnimations;
