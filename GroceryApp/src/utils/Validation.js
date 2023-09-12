import { showToast } from "../components/UICustom/UIToast";

export const ValidateLogin = (email, password, name) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (name == "") {
        showToast("error", "Lỗi", "Vui lòng nhập tên người dùng")
        return false;
    }
    else if (/\d/.test(name)) {
        showToast("error", "Lỗi", "Tên không được chứa số");
        return false;
    }
    else if (email.trim() == "") {
        showToast("error", "Lỗi", "Vui lòng nhập email")
        return false;
    }
    else if (!emailRegex.test(email)) {
        showToast("error", "Lỗi", "Vui lòng nhập email đúng định dạng")
        return false;
    }

    else if (password == "") {
        showToast("error", "Lỗi", "Vui lòng nhập mật khẩu")
        return false;
    }
    else if (password.length <= 6) {
        showToast("error", "Lỗi", "Mật khẩu phải lớn hơn 6 ký tự")
        return false;
    }

    return true
}


export const ValidateAddress = (name, phone, city, districts, ward, detailAddress) => {
    if (name == "") {
        showToast("error", "Lỗi", "Vui lòng nhập tên liên hệ")
        return false;
    }
    else if (/\d/.test(name)) {
        showToast("error", "Lỗi", "Tên không được chứa số");
        return false;
    }
    else if (phone.trim() == "") {
        showToast("error", "Lỗi", "Vui lòng nhập số điện thoại")
        return false;
    }
    else if (city == "") {
        showToast("error", "Lỗi", "Vui lòng chọn thành phố")
        return false;
    }
    else if (districts == "") {
        showToast("error", "Lỗi", "Vui lòng chọn quận/huyện")
        return false;
    }
    else if (ward == "") {
        showToast("error", "Lỗi", "Vui lòng chọn xã")
        return false;
    }
    else if (detailAddress == "") {
        showToast("error", "Lỗi", "Vui lòng nhập địa chỉ cụ thể")
        return false;
    }

    return true
}




export const ValidateChangePass = (oldPass, newPass, rePass) => {
    if (oldPass == "") {
        showToast("error", "Lỗi", "Vui lòng nhập mật khẩu hiện tại")
        return false;
    }
    else if (newPass.trim() == "") {
        showToast("error", "Lỗi", "Vui lòng nhập mật khẩu mới")
        return false;
    }
    else if (rePass == "") {
        showToast("error", "Lỗi", "Vui lòng nhập lại mật khẩu")
        return false;
    }
    else if (newPass !== rePass) {
        showToast("error", "Lỗi", "Nhập lại nhập khẩu không trùng khớp")
        return false;
    }
    else if (newPass.length <= 6 || rePass.length <= 6) {
        showToast("error", "Lỗi", "Mật khẩu phải lớn hơn 6 ký tự")
        return false;
    }

    return true
}



export const ValidatePayments = (address, cart) => {
    if (!address) {
        showToast("error", "Lỗi", "Vui lòng chọn đia chỉ giao hàng")
        return false;
    }
    else if (cart.length == 0) {
        showToast("error", "Lỗi", "Giỏ hàng của bạn đang trống")
        return false;
    }
    return true
}
