import * as types from '../constants/cartTypes';

const isCurrentlyInCart = (state, payload) =>
  state.cartItems.find(item => item._id === payload._id);

const initialState = {
    cartItems: [], 
    shippingAddress: {}
};

const reducer = (state= initialState, action) => {
    switch (action.type) {
        case types.CART_ADD_ITEM:
            if (isCurrentlyInCart(state, action.payload)) {
                return {
                  ...state,
                  cartItems: state.cartItems.map((item) =>
                    item._id === action.payload._id ? action.payload : item
                  ),
                }
              }
              return {
                ...state,
                cartItems: [...state.cartItems, action.payload],
              }
        case types.CART_REMOVE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter(x => 
                    x.product !== action.payload
                )
            };
        case types.CLEAR_CART:
            return {
                ...state,
                cartItems: []
            };
        default:
            return state;
    }
};

export default reducer;