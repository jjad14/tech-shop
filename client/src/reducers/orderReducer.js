import * as types from '../constants/orderTypes';

const initialState = {
    orders: [],
    order: {},
    confirmedOrder: {},
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
                loading: true,
                error: null
            };
        case types.ORDER_DETAILS_SUCCESS:
            return {
                ...state,
                order: action.payload,
                confirmedOrder: action.payload,
                loading: false
            };
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
        case types.CLEAR_ORDER:
            return {
                ...state,
                order: {},
                confirmedOrder: {},
                loading: false,
                success: false,
                error: null
            };        
        default:
            return state;
    }
};

export default reducer;