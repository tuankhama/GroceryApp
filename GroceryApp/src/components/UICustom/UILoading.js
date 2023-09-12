import { StyleSheet, Text, View, ActivityIndicator, Modal, Platform } from 'react-native'
import React from 'react'

const UILoading = (props) => {
    const { visible } = props
    return (
        <Modal transparent visible={visible} animationType="fade">
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <ActivityIndicator size={50} color='#000000' />
                </View>
            </View>
        </Modal>
    );

}

export default UILoading

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Platform.OS === 'android' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.5)',
    },
    container: {

        justifyContent: 'center',
        height: 170,
        width: 200,
        padding: 20,

    },
})