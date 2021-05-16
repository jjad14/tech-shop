import api from '../utils/api';
import * as types from '../constants/orderTypes';

export const createOrder = (order) => async (dispatch) => {
  try {
    dispatch({
        type: types.ORDER_CREATE_START,
    });

    const { data } = await api.post('/orders', order);

    dispatch({
      type: types.ORDER_CREATE_SUCCESS,
      payload: data,
    });
    
  } catch (error) {
    dispatch({
      type: types.ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

