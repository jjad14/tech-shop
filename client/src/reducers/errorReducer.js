import * as types from '../constants/errorTypes';

/* 
User error:
    errorUser: null

Product Error
    errorProduct: null

Authentication Error
    errorAuthentication: null

Authorization Error
    errorAuthorization: null

Validation Error
    errorValidation: null

Order Error:
    errorOrder: null,

Cart Error:
    errorCart: null,

Payment Error:
    errorPayment: null,

Review Error:
    errorReview: null,

Filter Error:
    errorFilter: null,

Carousel Error:
    errorCarousel: null,
*/

const initialState = {
    errorUser: null,
    errorProduct: null,
    errorAuthentication: null,
    errorAuthorization: null,
    errorValidation: null,
    errorOrder: null,
    errorCart: null,
    errorPayment: null,
    errorReview: null,
    errorFilter: null,
    errorCarousel: null,
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