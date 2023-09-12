import { useDispatch } from "react-redux";
import AxiosIntance from "../../utils/AxiosIntance"
import { setProducts } from "../../redux/home/productSlice";
import { detailSuccess, setProductDetail } from "../../redux/home/productDetailSlice";
import { pendingCategory, setCategories } from "../../redux/home/categorySlice";
import { deleteFavorite, pending, setFavorite, updateFavorite } from "../../redux/home/favoriteSlice";
import { decreaseQuantity, increaseQuantity, pendingCart, removeItemCart, setCart, updateCart } from "../../redux/home/cartSlice";
import { showToast } from "../../components/UICustom/UIToast";
import { addAddress, removeAddress, setAddressData, updateAddress } from "../../redux/home/addressSlice";

export const getAllCategories = () => async (dispatch) => {
    try {
        dispatch(pendingCategory())
        const response = await AxiosIntance().get('categories')
        dispatch(setCategories(response.data))
        return response.data;
    } catch (error) {
        console.log(error);
    }
}


export const getProductByIdCate = async (idCate) => {
    try {
        const response = await AxiosIntance().get(`products/getbycate/${idCate}`)
        return response.data;

    } catch (error) {
        console.log(error);
    }
}



export const getDetailProduct = (idProduct) => async (dispatch) => {
    try {
        dispatch(detailSuccess())
        const response = await AxiosIntance().get(`products/detail/${idProduct}`)
        dispatch(setProductDetail(response.data))
        return response.data;
    } catch (error) {
        console.log(error);
    }
}



export const getAllProduct = () => async (dispatch) => {
    try {
        const response = await AxiosIntance().get(`products`)
        dispatch(setProducts(response.data))
        return response.data;
    } catch (error) {
        console.log(error);

    }
}


export const getFavorite = (idUser) => async (dispatch) => {
    try {
        dispatch(pending())
        const response = await AxiosIntance().get(`/favorites/${idUser}`)
        dispatch(setFavorite(response.data))
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const addFavorite = (idUser, idProduct) => async (dispatch) => {
    try {
        dispatch(pending())


        const response = await AxiosIntance().post(`/favorites/add/${idUser}/${idProduct}`)
        dispatch(updateFavorite(response.data))
        return response.data;
    } catch (error) {
        console.log(error);
    }
}


export const removeFavorite = (idUser, idProduct) => async (dispatch) => {
    try {
        dispatch(pending())
        dispatch(deleteFavorite(idProduct))
        const response = await AxiosIntance().delete(`/favorites/delete/${idUser}/${idProduct}`)
        return response.data;
    } catch (error) {
        console.log(error);
    }
}





export const getCart = (idUser) => async (dispatch) => {
    try {
        const response = await AxiosIntance().get(`/carts/${idUser}`)
        dispatch(setCart(response.data))
        return response.data;
    } catch (error) {
        console.log(error);
    }
}


export const addItemToCart = (idUser, idProduct, quantity) => async (dispatch) => {
    try {

        dispatch(pendingCart())
        let url = `carts/add/${idUser}/${idProduct}`
        if (quantity) {
            url = `carts/add/${idUser}/${idProduct}/?quantity=${quantity}`
        }

        const response = await AxiosIntance().post(url)

        showToast("success", "Thành công", "Thêm vào giỏ hàng thành công");
        dispatch(updateCart(response.data))
        return response.data;
    } catch (error) {
        dispatch(error())
        console.log(error);
    }
}


export const removeItemToCart = (idUser, idProduct) => async (dispatch) => {
    try {
        dispatch(pendingCart())
        dispatch(removeItemCart(idProduct))
        const response = await AxiosIntance().delete(`carts/delete/${idUser}/${idProduct}`)
        return response.data;
    } catch (error) {
        dispatch(error())
        console.log(error);
    }
}



export const addQuantity = (idUser, idProduct) => async (dispatch) => {
    try {
        dispatch(increaseQuantity(idProduct))
        const response = await AxiosIntance().post(`carts/increase/${idUser}/${idProduct}`)
        return response.data;
    } catch (error) {
        dispatch(error())
        console.log(error);
    }
}

export const decreaseQuantityService = (idUser, idProduct) => async (dispatch) => {
    try {
        dispatch(decreaseQuantity(idProduct))
        const response = await AxiosIntance().post(`carts/decrease/${idUser}/${idProduct}`)
        return response.data;
    } catch (error) {
        dispatch(error())
        console.log(error);
    }
}


export const setAddressDataOnSever = (idUser) => async (dispatch) => {
    try {
        const response = await AxiosIntance().get(`users/getaddress/${idUser}`)

        dispatch(setAddressData(response.data))
        return response.data;
    } catch (error) {
        console.log(error);
    }
}


export const addAddressOnServer = (idUser, infoAddress) => async (dispatch) => {
    try {
        const response = await AxiosIntance().post(`users/address/${idUser}`, infoAddress)
        dispatch(addAddress(response.data));
        return response.data;
    } catch (error) {
        console.log(error);
    }
}


export const removeAddressOnserver = (idUser, idAddress) => async (dispatch) => {
    try {
        dispatch(removeAddress(idAddress));
        const response = await AxiosIntance().post(`users/removeaddress/${idUser}/${idAddress}`)
        return response.data;
    } catch (error) {
        console.log(error);
    }
}


export const getDetailAddress = async (idUser, idAddress) => {
    try {
        const response = await AxiosIntance().get(`users/getdetailaddress/${idUser}/${idAddress}`)
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const updateAddressOnServer = (idUser, idAddress, name, phone, address, detailAddress) => async (dispatch) => {
    try {
        const infoAddress = {
            idAddress: idAddress,
            name: name,
            phone: phone,
            address: address,
            detailAddress: detailAddress
        }
        dispatch(updateAddress(infoAddress))
        const response = await AxiosIntance().post(`users/editaddress/${idUser}/${idAddress}`, infoAddress)
        return response.data;
    } catch (error) {
        console.log(error);
    }
}