import axios from 'axios';

import * as types from '../constants/cartTypes';


// getState allows us to access the state from other reducers
export const addToCart = (id, qty) => async (dispatch, getState) => {
    // get cart by id
    const { data } = await axios.get(`/api/products/${id}`);

    dispatch({
        type: types.CART_ADD_ITEM,
        payload: {
            product: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            inventory: data.inventory,
            qty
        }
    });

    localStorage.setItem(
        'cartItems', 
        JSON.stringify(getState().cart.cartItems)
    );
};

export const removeFromCart = () => async dispatch => {

};
