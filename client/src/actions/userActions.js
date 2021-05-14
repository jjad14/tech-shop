import api from '../utils/api'
import * as types from '../constants/userTypes';

// login a user
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

// register a user
export const register = (name, email, password) => async dispatch => {
    try {
        dispatch({
            type: types.USER_REGISTER_START,
        });

        const { data } = await api.post('/users', {name, email, password});

        dispatch({
            type: types.USER_REGISTER_SUCCESS,
            payload: data,
        });
    } catch (err) {
        dispatch({
            type: types.USER_REGISTER_FAIL,
            payload: err.response?.data?.message || err.message,
        });
    }
};

// logout user
export const logout = (history) => async dispatch => {
    await api.delete('/users/logout')
    dispatch({ type: types.USER_LOGOUT });  

    history.push('/login');
};

// get users profile
export const getUserDetails = (idOrEndPoint = 'profile') => async dispatch => {
    try {
        dispatch({
            type: types.USER_DETAILS_START,
        });

        const { data } = await api.get(`/users/${idOrEndPoint}`);  

        dispatch({
            type: types.USER_DETAILS_SUCCESS,
            payload: data
        });

        } catch (err) {
        dispatch({
            type: types.USER_DETAILS_FAIL,
            payload: err.response?.data?.message || err.message,
        });
    }
};

// update users profile
export const updateUserProfile = (user) => async dispatch => {
    try {
        dispatch({
            type: types.USER_UPDATE_PROFILE_START,
        });

        const { data } = await api.put('/users/profile', user);

        dispatch({
            type: types.USER_UPDATE_PROFILE_SUCCESS,
            payload: data,
        });

    } catch (err) {
        dispatch({
            type: types.USER_UPDATE_PROFILE_FAIL,
            payload: err.response?.data?.message || err.message,
        });
    }
};