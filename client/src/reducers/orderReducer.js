import * as types from '../constants/orderTypes';

const initialState = {
    orders: [],
    createdOrder: {},
    orderDetails: {},
    loading: false,
    success: false, // place order succeeded
    paymentSuccess: false, // payment succeeded
};

const reducer = (state=initialState, action) => {
    switch (action.type) {
        case types.ORDER_CREATE_START:
        case types.ORDER_DETAILS_START:
        case types.ORDER_PAY_START:
        case types.ORDER_MY_LIST_START:
            return {
                ...state,
                loading: true,
            };
        case types.ORDER_DETAILS_SUCCESS:
            return {
                ...state,
                orderDetails: {
                    ...action.payload,
                    user: {
                        ...action.payload.user
                    }
                },
                loading: false
            };
        case types.ORDER_CREATE_SUCCESS:
            return {
                ...state,
                success: true, // for redirection
                createdOrder: action.payload,
                loading: false
            };
        case types.ORDER_MY_LIST_SUCCESS:
            return {
                ...state,
                orders: action.payload,
                loading: false
            };
        case types.ORDER_PAY_SUCCESS:
            return {
                ...state,
                loading: false,
                paymentSuccess: true
            };
        case types.ORDER_CREATE_FAIL:
        case types.ORDER_DETAILS_FAIL:
        case types.ORDER_PAY_FAIL:
        case types.ORDER_MY_LIST_FAIL:
            return {
                ...state,
                loading: false
            };
        case types.ORDER_CREATE_RESET:
            return {
                ...state,
                createdOrder: {},
                success: false,
            };
        // on logout
        case types.ORDER_RESET:
            return {
                ...state,
                orders: [],
                createdOrder: {},
                orderDetails: {},
                loading: false,
                success: false,
                paymentSuccess: false, 
            };
        case types.ORDER_PAY_RESET:
            return {
                ...state,
                paymentSuccess: false,
                success: false,
            };
        case types.ORDER_MY_LIST_RESET:
            return {
                ...state,
                orders: []
            };       
        default:
            return state;
    }
};

export default reducer;