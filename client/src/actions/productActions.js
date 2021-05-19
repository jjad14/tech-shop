import api from '../utils/api';
import * as types from '../constants/productTypes';

// get products
export const getProducts = () => async (dispatch) => {
  try {
    dispatch({
      type: types.CLEAR_PRODUCT_ERROR,
    });

    const { data } = await api.get('/products');

    dispatch({
      type: types.GET_PRODUCTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: types.GET_PRODUCTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
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
  } catch (error) {
    dispatch({
      type: types.GET_PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// clear products details (single product)
export const clearProductDetails = () => async (dispatch) => {
  dispatch({ type: types.CLEAR_PRODUCT_DETAILS, payload: {} });
};
