import * as types from '../constants/cartTypes';


export const initialCartState = {
    cartItems: [], 
    shippingAddress: {
      address: '',
      city: '',
      postalCode: '',
      country: '',
      phoneNumber: ''
    },
    paymentMethod: null
  };
  
const isCurrentlyInCart = (state, payload) =>
  state.cartItems.find(item => item.product === payload.product);

  const reducer = (state=initialCartState, action) => {
    switch (action.type) {
        case types.CART_ADD_ITEM:
          // check if item is currently in cart
            if (isCurrentlyInCart(state, action.payload)) {
              // update item in cart
                return {
                  ...state,
                  cartItems: state.cartItems.map((item) =>
                    item.product === action.payload.product ? action.payload : item
                  ),
                }
              }
              // add item to cart
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
        case types.CLEAR_SHIPPING_PAYMENT:
          // clear shipping and payment info (on logout)
          return {
            ...state,
            shippingAddress: {
              address: '',
              city: '',
              postalCode: '',
              country: '',
              phoneNumber: ''
            },
            paymentMethod: null
          };
        case types.CART_ITEMS_RESET: 
          // clear cart after order is created
          return {
           ...state, 
           cartItems: []
          }
        default:
            return state;
    }
};

export default reducer;