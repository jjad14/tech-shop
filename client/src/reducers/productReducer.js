import * as types from '../constants/productTypes';

const initialState = {
    products: [],
    product: { reviews: []},
    loading: false
};

// @TODO: Previously removed loading, could implement it back just so we can make use of the Fail constants to keep the reducer fluent, just a preference and is optional, we determine loading if the product or products hasnt loaded

const reducer = (state= initialState, action) => {
    switch (action.type) {
        // All Products
        case types.GET_PRODUCTS_SUCCESS:
            return {
                ...state,
                products: action.payload, 
            };
        // Individual Product
        case types.GET_PRODUCT_DETAILS_SUCCESS:
            return {
                ...state,
                product: action.payload, 
            };
        // case types.GET_PRODUCTS_FAIL:
        // case types.GET_PRODUCT_DETAILS_FAIL:
        // case types.CLEAR_PRODUCT_ERROR:
        //     return {
        //         ...state,
        //     }; 
        // case types.CLEAR_PRODUCT_DETAILS:
        //     return {
        //         ...state,
        //         product: { reviews: []}
        //     }; 
        default:
            return state;
    }
};

export default reducer;