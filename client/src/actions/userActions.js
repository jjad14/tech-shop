import api from '../utils/api'
import * as types from '../constants/userTypes';
import { ORDER_MY_LIST_RESET, ORDER_RESET } from '../constants/orderTypes';
import { CLEAR_SHIPPING_PAYMENT } from '../constants/cartTypes';
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productTypes';
import { setError } from '../actions/errorActions';

// login a user
export const login = (email, password) => async dispatch => {
    try {
        dispatch({
            type: types.USER_LOGIN_START,
        });

        const config = {
            headers: {
              'Content-Type': 'application/json',
            }
        };
      
        const { data } = await api.post('/users/login', { email, password }, config);

        dispatch({
            type: types.USER_LOGIN_SUCCESS,
            payload: data,
        });

    } catch (err) {
        dispatch({type: types.USER_LOGIN_FAIL});
        dispatch(setError('errorAuthentication', err.response?.data?.message || err.message));
    }
};

// register a user
export const register = (name, email, password, confirmPassword) => async dispatch => {
    try {
        console.log({name, email, password, confirmPassword})
        dispatch({
            type: types.USER_REGISTER_START,
        });

        const config = {
            headers: {
              'Content-Type': 'application/json',
            }
        };

        const { data } = await api.post('/users', {name, email, password, confirmPassword}, config);

        dispatch({
            type: types.USER_REGISTER_SUCCESS,
            payload: data,
        });

    } catch (err) {
        dispatch({type: types.USER_REGISTER_FAIL});
        dispatch(setError('errorAuthentication', err.response?.data?.message || err.message));
    }
};

// logout user
export const logout = (history) => async dispatch => {
    await api.delete('/users/logout');

    localStorage.removeItem('cartItems');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');

    dispatch({ type: ORDER_MY_LIST_RESET });  
    dispatch({ type: CLEAR_SHIPPING_PAYMENT }); 
    dispatch({ type: ORDER_RESET}); 
    dispatch({ type: PRODUCT_CREATE_REVIEW_RESET}); 
    dispatch({ type: types.USER_LOGOUT });  

    history.push('/login');
};

// Get currently logged in users details
export const getUserDetails = () => async dispatch => {
    try {
        dispatch({
            type: types.USER_DETAILS_START,
        });

        const { data } = await api.get(`/users/profile`);  

        dispatch({
            type: types.USER_DETAILS_SUCCESS,
            payload: data
        });

        } catch (err) {
        dispatch({type: types.USER_DETAILS_FAIL});
        dispatch(setError('errorUser', err.response?.data?.message || err.message));
    }
};

// update current users profile
export const updateUserProfile = (user) => async dispatch => {
    try {
        dispatch({
            type: types.USER_UPDATE_PROFILE_START,
        });

        const config = {
            headers: {
              'Content-Type': 'application/json',
            }
        };

        const { data } = await api.put('/users/profile', user, config);

        dispatch({
            type: types.USER_UPDATE_PROFILE_SUCCESS,
            payload: data,
        });

    } catch (err) {
        dispatch({type: types.USER_UPDATE_PROFILE_FAIL});
        dispatch(setError('errorUser', err.response?.data?.message || err.message));
    }
};

// get a user by id (Admin)
export const getUserById = (id) => async dispatch => {
    try {
        dispatch({
            type: types.USER_DETAILS_START,
        });

        const { data } = await api.get(`/users/${id}`);  

        dispatch({
            type: types.USER_SINGLE_DETAILS_SUCCESS,
            payload: data
        });

        } catch (err) {
        dispatch({type: types.USER_DETAILS_FAIL});
        dispatch(setError('errorUser', err.response?.data?.message || err.message));
    }
};

// Update a users details (Admin)
export const updateUser = (user) => async dispatch => {
    try {
        dispatch({
            type: types.USER_UPDATE_START,
        });

        const config = {
            headers: {
              'Content-Type': 'application/json',
            }
        };

        const { data } = await api.put(`/users/${user._id}`, user, config);  

        dispatch({
            type: types.USER_UPDATE_SUCCESS,
            payload: data
        });

        } catch (err) {
        dispatch({type: types.USER_UPDATE_FAIL});
        dispatch(setError('errorUser', err.response?.data?.message || err.message));
    }
};


// Get list of users (Admin)
export const listUsers = (pageNumber = '') => async dispatch => {
    try {
        dispatch({
            type: types.USER_LIST_START,
        });

        const { data } = await api.get(
            `/users?pageNumber=${pageNumber}`);

        dispatch({
            type: types.USER_LIST_SUCCESS,
            payload: data,
        });

    } catch (err) {
        dispatch({type: types.USER_LIST_FAIL});
        dispatch(setError('errorUser', err.response?.data?.message || err.message));
    }
};

// Delete User (Admin)
export const deleteUser = (id) => async dispatch => {
    try {
        dispatch({
            type: types.USER_DELETE_START,
        });

        await api.delete(`/users/${id}`);

        dispatch({ type: types.USER_DELETE_SUCCESS });

    } catch (err) {
        dispatch({type: types.USER_DELETE_FAIL});
        dispatch(setError('errorUser', err.response?.data?.message || err.message));
    }
};