import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'

export default function UISearch(props) {
    const { onChangeText, placeholder, value } = props
    return (
        <View
            style={styles.containerInput}
        >
            <TouchableOpacity>
                <Image
                    style={{ width: 20, height: 20, marginRight: 10 }}
                    source={require('../../media/images/icon_search.png')}></Image>
            </TouchableOpacity>
            <TextInput
                onChangeText={onChangeText}
                value={value}
                placeholder='Search'
                style={{ flex: 1, height: "100%" }}>
            </TextInput>
        </View>
    )
}

const styles = StyleSheet.create({
    containerInput: {
        marginTop: 10,
        marginHorizontal: 20,
        width: "85%",
        height: 45,
        borderRadius: 10,
        alignItems: 'center',
        paddingLeft: 20,
        flexDirection: 'row',
        backgroundColor: '#F3F3F3'
    }
})