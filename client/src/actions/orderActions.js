import api from '../utils/api';
import * as types from '../constants/orderTypes';
import { setError } from '../actions/errorActions';

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
    
  } catch (err) {
    dispatch({type: types.ORDER_CREATE_FAIL});
    dispatch(setError('errorOrder', err.response?.data?.message || err.message));
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
    
  } catch (err) {
    dispatch({type: types.ORDER_DETAILS_FAIL});
    dispatch(setError('errorOrder', err.response?.data?.message || err.message));
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
    
  } catch (err) {
    dispatch({type: types.ORDER_PAY_FAIL});
    dispatch(setError('errorPayment', err.response?.data?.message || err.message));
  }
};

// deliver/ship the order (Admin)
export const deliverOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: types.ORDER_DELIVER_START,
    });

    const { data } = await api.put(`/orders/${order._id}/deliver`, {});

    dispatch({
      type: types.ORDER_DELIVER_SUCCESS,
      payload: data,
    })
  } catch (err) {
    dispatch({type: types.ORDER_DELIVER_FAIL});
    dispatch(setError('errorPayment', err.response?.data?.message || err.message));
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
    
  } catch (err) {
    dispatch({type: types.ORDER_MY_LIST_FAIL});
    dispatch(setError('errorOrder', err.response?.data?.message || err.message));
  }
};

// List all Orders (Admin)
export const listAllOrders = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: types.ORDER_LIST_START,
    });

    const { data } = await api.get(`/orders`);

    dispatch({
      type: types.ORDER_LIST_SUCCESS,
      payload: data,
    });

  } catch (err) {
    dispatch({type: types.ORDER_LIST_FAIL});
    dispatch(setError('errorOrder', err.response?.data?.message || err.message));
  }
};