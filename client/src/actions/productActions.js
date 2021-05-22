import api from '../utils/api';
import * as types from '../constants/productTypes';
import { setError, clearError } from '../actions/errorActions';

// get products
export const getProducts = () => async (dispatch) => {
  try {
    dispatch({
      type: types.GET_PRODUCTS_START
    });

    const { data } = await api.get('/products');

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
export const createProduct = (id) => async dispatch => {

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

    const { data } = await api.put(`/product/${product._id}`, product, config);  

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