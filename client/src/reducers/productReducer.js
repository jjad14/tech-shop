import * as types from '../constants/productTypes';

const initialState = {
    products: [],
    product: { reviews: []},
    loading: false,
    error: null
};

const reducer = (state= initialState, action) => {
    switch (action.type) {
        // All Products
        case types.GET_PRODUCTS_START:
            return {
                ...state,
                loading: true
            };
        case types.GET_PRODUCTS_SUCCESS:
            return {
                ...state,
                products: action.payload,
                loading: false 
            };
        case types.GET_PRODUCTS_FAIL:
            return {
                ...state,
                error: action.payload,
                loading: false
            }; 
        // Individual Product
        case types.GET_PRODUCT_DETAILS_START:
            return {
                ...state,
                loading: true
            };
        case types.GET_PRODUCT_DETAILS_SUCCESS:
            return {
                ...state,
                product: action.payload,
                loading: false 
            };
        case types.GET_PRODUCT_DETAILS_FAIL:
            return {
                ...state,
                error: action.payload,
                loading: false
            }; 
        default:
            return state;
    }
};

export default reducer;