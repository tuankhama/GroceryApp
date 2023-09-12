import { StyleSheet, Text, View, SafeAreaView, Image, StatusBar } from 'react-native'

import React from 'react'
import UIHeader from '../UICustom/UIHeader'
import UIInput from '../UICustom/UIInput'
import UIButton from '../UICustom/UIButton'
import { useState } from 'react'
import { changePassword } from '../../service/Auth/UserService'
import { useSelector } from 'react-redux'
import { ValidateChangePass } from '../../utils/Validation'

const ChangePass = () => {
    const [oldPass, setOldPass] = useState("")
    const [newPass, setNewPass] = useState("")
    const [repass, setrepass] = useState("")
    const { user } = useSelector((state) => state.auth)
    const handleChangePass = async () => {
        const validate = ValidateChangePass(oldPass, newPass, repass)
        if (validate) {
            const result = await changePassword(user._id, oldPass, repass)
            if (result) {
                setNewPass("")
                setOldPass("")
                setrepass("")
            }
        }
    }
    return (
        <SafeAreaView style={{ flex: 1, paddingTop: StatusBar.currentHeight, backgroundColor: "#FFFFFF" }}>
            <View style={{ marginHorizontal: 10, flex: 1 }}>
                <UIHeader title="Đổi mật khẩu"></UIHeader>
                <View style={{ justifyContent: 'space-between', flex: 1 }}>
                    <View style={{ marginTop: 30, }}>
                        <UIInput
                            value={oldPass}
                            onChangeText={setOldPass}
                            placeholder='Nhập mật khẩu cũ'></UIInput>
                        <UIInput
                            value={newPass}
                            onChangeText={setNewPass}
                            placeholder='Nhập mật khẩu mới'></UIInput>
                        <UIInput
                            value={repass}
                            onChangeText={setrepass}
                            placeholder='Nhập lại mật khảu mới'></UIInput>
                    </View>

                </View>
                <View style={{}}>
                    <UIButton
                        onPress={handleChangePass}
                        title="Đổi mật khẩu"></UIButton>

                </View>
            </View>


        </SafeAreaView>
    )
}

export default ChangePass

const styles = StyleSheet.create({})