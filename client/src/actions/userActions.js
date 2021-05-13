import api from '../utils/api'
import * as types from '../constants/userTypes';

export const login = (email, password) => async dispatch => {
    try {
        dispatch({
            type: types.USER_LOGIN_START,
        });

        const { data } = await api.post('/users/login', { email, password });

        dispatch({
            type: types.USER_LOGIN_SUCCESS,
            payload: data,
        });
    } catch (err) {
        dispatch({
            type: types.USER_LOGIN_FAIL,
            payload: err.response?.data?.message || err.message,
        });
    }
};

export const logout = (history) => async dispatch => {
    await api.delete('/users/logout')
    dispatch({ type: types.USER_LOGOUT });  

    history.push('/login');
};