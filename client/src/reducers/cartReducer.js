import * as types from '../constants/cartTypes';

const initialState = {
    cartItems: [], 
    shippingAddress: {}
};

const reducer = (state= initialState, action) => {
    switch (action.type) {
        case types.CART_ADD_ITEM:
            // contains product id, name, image, price inventory and qty
            const item = action.payload;

            // check if item is in cart
            const existItem = state.cartItems.find(x =>
                x.product === item.product
            );

            if (existItem) {
                // overwrite product
                return {
                    ...state,
                    cartItems: state.cartItems.map(x => 
                        x.product === existItem.product ? item : x
                    )
                };
            }
            else {
                // product doesnt exist in cart                
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                };
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