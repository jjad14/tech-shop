import * as types from '../constants/errorTypes';

/* 
User error:
    errorUser: null

Product Error
    errorProduct: null

Authentication Error
    errorAuth: null

Validation Error
    errorValidation: null

Order Error:
    errorOrder: null,

Cart Error:
    errorCart: null,

Payment Error:
    errorPayment: null,
*/
const initialState = {
    errorUser: null,
    errorProduct: null,
    errorAuth: null,
    errorValidation: null,
    errorOrder: null,
    errorCart: null,
    errorPayment: null,
};

const reducer = (state= initialState, action) => {
    switch (action.type) {
        case types.SET_ERROR:
            return {
                ...state,
                [action.payload.errorType]: action.payload.message, 
            };
        case types.CLEAR_ERROR:
            return {
                ...state,
                [action.payload]: null,
            }; 
        default:
            return state;
    }
};

export default reducer;