import api from '../utils/api';
import * as types from '../constants/productTypes';
import { setError, clearError } from '../actions/errorActions';

// get products
export const getProducts = (keyword = '', pageNumber = '') => async (dispatch) => {
  try {
    dispatch({
      type: types.GET_PRODUCTS_START
    });

    const { data } = await api.get(
      `/products?keyword=${keyword}&pageNumber=${pageNumber}`);

    dispatch({
      type: types.GET_PRODUCTS_SUCCESS,
      payload: data,
    });

    
  } catch (err) {
    dispatch(clearError('errorProduct'));
    dispatch({
      type: types.GET_PRODUCTS_FAIL
    });
    dispatch(setError('errorProduct', err.response?.data?.message || err.message));
  }
};

// get a product by id
export const getProduct = (id) => async (dispatch) => {
  try {
    dispatch({
      type: types.GET_PRODUCT_DETAILS_START
    });

    const { data } = await api.get(`/products/${id}`);

    dispatch({
      type: types.GET_PRODUCT_DETAILS_SUCCESS,
      payload: data,
    });

    
  } catch (err) {
    dispatch(clearError('errorProduct'));
    dispatch({
      type: types.GET_PRODUCT_DETAILS_FAIL
    });
    dispatch(setError('errorProduct', err.response?.data?.message || err.message));
  }
};

// Create a Product
export const createProduct = () => async dispatch => {
  try {
    dispatch({
        type: types.PRODUCT_CREATE_START,
    });

    const { data } = await api.post(`/products/`);  

    dispatch({
        type: types.PRODUCT_CREATE_SUCCESS,
        payload: data
    });

    } catch (err) {
    dispatch({type: types.PRODUCT_CREATE_FAIL});
    dispatch(setError('errorProduct', err.response?.data?.message || err.message));
  }
};

// Update a Product
export const updateProduct = (product) => async dispatch => {
  try {
    dispatch({
        type: types.PRODUCT_UPDATE_START,
    });

    const config = {
        headers: {
          'Content-Type': 'application/json',
        }
    };

    const { data } = await api.put(`/products/${product._id}`, product, config);  

    dispatch({
        type: types.PRODUCT_UPDATE_SUCCESS,
        payload: data
    });

    } catch (err) {
    dispatch({type: types.PRODUCT_UPDATE_FAIL});
    dispatch(setError('errorProduct', err.response?.data?.message || err.message));
  }
};

// Delete a Product
export const deleteProduct = (id) => async dispatch => {
  try {
    dispatch({
        type: types.PRODUCT_DELETE_START,
    });

    await api.delete(`/products/${id}`);

    dispatch({ type: types.PRODUCT_DELETE_SUCCESS });

  } catch (err) {
      dispatch({type: types.PRODUCT_DELETE_FAIL});
      dispatch(setError('errorProduct', err.response?.data?.message || err.message));
  }
};

// Create a review
export const createReview = (id, review) => async dispatch => {
  try {
    dispatch({
        type: types.PRODUCT_CREATE_REVIEW_START,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      }
    };

    await api.post(`/products/${id}/reviews`, review, config);

    dispatch({ type: types.PRODUCT_CREATE_REVIEW_SUCCESS });

  } catch (err) {
      dispatch({type: types.PRODUCT_CREATE_REVIEW_FAIL});
      dispatch(setError('errorReview', err.response?.data?.message || err.message));
  }
};