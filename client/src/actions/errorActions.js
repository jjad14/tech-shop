import * as types from '../constants/errorTypes';

// set the error
export const setError = (errorType, message, timeout = 8000) => async (dispatch) => {
    //@TODO: this might be too much, could check if there is an error already to clear
    // dispatch({type: types.CLEAR_ERROR, payload: errorType});

    dispatch({
        type: types.SET_ERROR, 
        payload: {
            errorType,
            message
        }
    });

    // some errors do not need a timeout
    if (errorType !== 'errorProduct' && errorType !== 'errorOrder' && errorType !== 'errorPayment') {
        setTimeout(() => {
            dispatch({type: types.CLEAR_ERROR, payload: errorType});
        }, timeout);
    }

};

// clear the error
export const clearError = (errorType) => async (dispatch) => {
    dispatch({
        type: types.CLEAR_ERROR, 
        payload: errorType
    });
};
