import api from '../utils/api';
import * as types from '../constants/productTypes';
import { setError, clearError } from '../actions/errorActions';

// get products
export const getProducts = () => async (dispatch) => {
  try {
    const { data } = await api.get('/products');

    dispatch({
      type: types.GET_PRODUCTS_SUCCESS,
      payload: data,
    });

    dispatch(clearError('errorProduct'));

  } catch (err) {
    dispatch(setError('errorProduct', err.response?.data?.message || err.message));
  }
};

// get a product by id
export const getProduct = (id) => async (dispatch) => {
  try {
    const { data } = await api.get(`/products/${id}`);

    dispatch({
      type: types.GET_PRODUCT_DETAILS_SUCCESS,
      payload: data,
    });

    dispatch(clearError('errorProduct'));

  } catch (err) {
    dispatch(setError('errorProduct', err.response?.data?.message || err.message));
  }
};
