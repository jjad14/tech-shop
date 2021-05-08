import * as types from '../constants/productTypes';

const initialState = {
    products: [],
    loading: false,
    error: {}
};

const reducer = (state= initialState, action) => {
    switch (action.type) {
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
        default:
            return state;
    }
};

export default reducer;