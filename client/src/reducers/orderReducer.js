import * as types from '../constants/orderTypes';

const initialState = {
    orders: [],
    order: {},
    loading: false,
    success: false,
    error: null
};

const reducer = (state= initialState, action) => {
    switch (action.type) {
        case types.ORDER_CREATE_START:
        case types.ORDER_DETAILS_START:
            return {
                ...state,
                loading: false
            };
        case types.ORDER_DETAILS_SUCCESS:
        case types.ORDER_CREATE_SUCCESS:
            return {
                ...state,
                success: true,
                order: action.payload,
                loading: false
            };
        case types.ORDER_CREATE_FAIL:
        case types.ORDER_DETAILS_FAIL:
            return {
                ...state,
                success: false,
                error: action.payload,
                loading: false
            };
        

        default:
            return state;
    }
};

export default reducer;