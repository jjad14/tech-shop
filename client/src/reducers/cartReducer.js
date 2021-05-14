import * as types from '../constants/cartTypes';

const isCurrentlyInCart = (state, payload) =>
  state.cartItems.find(item => item._id === payload._id);

export const initialCartState = {
    cartItems: [], 
    shippingAddress: {
      address: '',
      city: '',
      postalCode: '',
      country: ''
    }
};

const reducer = (state=initialCartState, action) => {
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
        case types.CART_SAVE_SHIPPING_ADDRESS:
          return {
            ...state,
            shippingAddress: action.payload,
          };
        case types.CART_SAVE_PAYMENT_METHOD:
          return {
            ...state,
            paymentMethod: action.payload,
          };
        default:
            return state;
    }
};

export default reducer;