import { combineReducers } from 'redux';

import productReducer from './productReducer';
import cartReducer from './cartReducer';
import userReducer from './userReducer';
import orderReducer from './orderReducer';
import errorReducer from './errorReducer';

// export all reducers
export default combineReducers({
    product: productReducer,
    cart: cartReducer,
    user: userReducer,
    order: orderReducer,
    error: errorReducer
});