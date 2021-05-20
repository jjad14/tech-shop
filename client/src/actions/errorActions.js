import api from '../utils/api';
import * as types from '../constants/errorTypes';

// get products
export const setError = (errorType, message) => async (dispatch) => {

    dispatch({
        type: types.SET_ERROR, 
        payload: {
            errorType,
            message
        }
    });

    setTimeout(() => {
        dispatch({type: types.CLEAR_ERROR, payload: id});
    }, timeout);

};

// get a product by id
export const clearError = (errorType) => async (dispatch) => {
    dispatch({
        type: types.CLEAR_ERROR, 
        payload: errorType
    });
};
