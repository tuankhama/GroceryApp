import { showToast } from "../../components/UICustom/UIToast";
import { loginSuccess, loginStart, loginFailure } from "../../redux/auth/authSlice";
import { addbill, setBill } from "../../redux/home/billSlice";
import AxiosIntance from "../../utils/AxiosIntance"
export const login = (credential) => async (dispatch) => {
    try {
        dispatch(loginStart());
        const response = await AxiosIntance().post('users/login', credential)
        const userData = response;
        if (!userData.status) {
            showToast("error", "Lỗi", userData.message);
            throw new Error("User error: " + JSON.stringify(userData.message));
        }
        showToast("success", "Thành công", userData.message);
        dispatch(loginSuccess(userData.data));
    } catch (error) {
        console.log(error);
        dispatch(loginFailure());
    }
}


export const register = async (credential) => {
    try {

        const response = await AxiosIntance().post('users/register', credential)
        const userData = response;
        if (!userData.status) {
            showToast("error", "Lỗi", userData.message);
            throw new Error("User error: " + JSON.stringify(userData.message));
        }
        showToast("success", "Thành công", userData.message);
        return userData;
    } catch (error) {
        console.log(error);
    }
}


export const changePassword = async (idUser, oldPass, newPass) => {
    try {
        const credential = {
            password: newPass,
            oldpass: oldPass
        }

        const response = await AxiosIntance().post(`users/change/${idUser}`, credential)
        const userData = response;
        if (!userData.status) {
            showToast("error", "Lỗi", userData.message);
            throw new Error("User error: " + JSON.stringify(userData.message));
        }
        showToast("success", "Thành công", userData.message);
        return userData;
    } catch (error) {
        console.log(error);
    }
}



export const addBillOnServer = (idUser, address, payment, phone, name) => async (dispatch) => {
    try {
        const bill = {
            idUser: idUser,
            address: address,
            payment: payment,
            phone: phone,
            name: name
        }

        const response = await AxiosIntance().post(`bills/add`, bill)
        dispatch(addbill(response.data))
        const userData = response;
        if (!userData.status) {
            showToast("error", "Lỗi", userData.message);
            throw new Error("User error: " + JSON.stringify(userData.message));
        }
        showToast("success", "Thành công", "Đặt hàng thành công");
        return userData;
    } catch (error) {
        console.log(error);
    }
}

export const getBill = (idUser) => async (dispatch) => {
    try {
        const response = await AxiosIntance().get(`bills/${idUser}`)
        dispatch(setBill(response.data))
        return response.data;
    } catch (error) {
        console.log(error);
    }
}


export const getBillDetail = async (idBill) => {
    try {
        const response = await AxiosIntance().get(`bills/detail/${idBill}`)
        return response.data;
    } catch (error) {
        console.log(error);
    }
}
export const cancelBillOnServer = async (idBill, idUser) => {
    try {
        const response = await AxiosIntance().post(`bills/cancel/${idBill}`)
        return response.data;
    } catch (error) {
        console.log(error);
    }
}
