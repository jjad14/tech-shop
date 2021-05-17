import * as types from '../constants/productTypes';

const initialState = {
    products: [],
    product: { reviews: []},
    error: null
};

const reducer = (state= initialState, action) => {
    switch (action.type) {
        // All Products
        case types.GET_PRODUCTS_SUCCESS:
            return {
                ...state,
                products: action.payload, 
            };
        case types.GET_PRODUCTS_FAIL:
            return {
                ...state,
                error: action.payload,
            }; 
        // Individual Product
        case types.GET_PRODUCT_DETAILS_SUCCESS:
            return {
                ...state,
                product: action.payload, 
            };
        case types.GET_PRODUCT_DETAILS_FAIL:
            return {
                ...state,
                error: action.payload,
            };
        case types.CLEAR_PRODUCT_ERROR:
            return {
                ...state,
                error: null
            }; 
        case types.CLEAR_PRODUCT_DETAILS:
            return {
                ...state,
                product: { reviews: []}
            }; 
        default:
            return state;
    }
};

export default reducer;