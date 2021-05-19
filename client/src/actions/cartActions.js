import api from '../utils/api';
import * as types from '../constants/cartTypes';

// add item to cart
export const addToCart = (id, qty) => async dispatch => {
    const { data } = await api.get(`/products/${id}`);

    dispatch({
        type: types.CART_ADD_ITEM,
        payload: {
            product: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            inventory: data.inventory,
            qty,
          }
    });
};

// remove item from cart
export const removeFromCart = (id) => {
    return {
      type: types.CART_REMOVE_ITEM,
      payload: id,
    };
};

// save shipping address
export const saveShippingAddress = (data) => {
    return {
        type: types.CART_SAVE_SHIPPING_ADDRESS,
        payload: data
    };
};

// save payment method
export const savePaymentMethod = (method) => {
    return {
        type: types.CART_SAVE_PAYMENT_METHOD,
        payload: method
    };
};

// empty cart items
export const emptyCartItems = () => (dispatch) => {
    dispatch({ type: types.CART_ITEMS_RESET });
   
    localStorage.setItem("cartItems", []);
}; 

