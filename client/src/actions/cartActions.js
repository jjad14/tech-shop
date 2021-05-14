import api from '../utils/api';
import * as types from '../constants/cartTypes';


// getState allows us to access the state from other reducers
export const addToCart = (id, qty) => async dispatch => {
    // get cart by id
    const { data } = await api.get(`/products/${id}`);

    dispatch({
        type: types.CART_ADD_ITEM,
        payload: {
            ...data,
            qty
        }
    });
};

export const removeFromCart = (id) => {
    return {
      type: types.CART_REMOVE_ITEM,
      payload: id,
    };
};

export const saveShippingAddress = (data) => {
    return {
        type: types.CART_SAVE_SHIPPING_ADDRESS,
        payload: data
    };
};
  
export const savePaymentMethod = (method) => {
    return {
        type: types.CART_SAVE_PAYMENT_METHOD,
        payload: method
    };
};