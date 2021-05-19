import api from '../utils/api';
import * as types from '../constants/orderTypes';

// create an order
export const createOrder = (order) => async (dispatch) => {
  try {
    dispatch({
        type: types.ORDER_CREATE_START,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      }
    };

    const { data } = await api.post('/orders', order, config);

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

// get the order details 
export const getOrderDetails = (id) => async (dispatch) => {
  try {
    dispatch({
        type: types.ORDER_DETAILS_START
    });

    const { data } = await api.get(`/orders/${id}`);

    dispatch({
      type: types.ORDER_DETAILS_SUCCESS,
      payload: data,
    });
    
  } catch (error) {
    dispatch({
      type: types.ORDER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// pay for the order
export const payOrder = (id, paymentResult) => async (dispatch) => {
  try {
    dispatch({
        type: types.ORDER_PAY_START,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      }
    };

    const { data } = await api.put(`/orders/${id}/pay`, paymentResult, config);

    dispatch({
      type: types.ORDER_PAY_SUCCESS,
      payload: data,
    });
    
  } catch (error) {
    dispatch({
      type: types.ORDER_PAY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// get a users orders
export const getMyOrders = () => async (dispatch) => {
  try {
    dispatch({
        type: types.ORDER_MY_LIST_START,
    });

    const { data } = await api.get(`/orders/myorders`);

    dispatch({
      type: types.ORDER_MY_LIST_SUCCESS,
      payload: data,
    });
    
  } catch (error) {
    dispatch({
      type: types.ORDER_MY_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};