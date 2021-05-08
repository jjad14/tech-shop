import axios from 'axios';

import * as types from '../constants/productTypes';

export const getProducts = () => async (dispatch) => {
  try {
    dispatch({
      type: types.GET_PRODUCTS_START,
    });

    const { data } = await axios.get('/api/products');

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
          : error.message
    });
  }
};
