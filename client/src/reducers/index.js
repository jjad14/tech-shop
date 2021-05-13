import { combineReducers } from 'redux';

import productReducer from './productReducer';
import cartReducer from './cartReducer';
import userReducer from './userReducer';

// export all reducers
export default combineReducers({
    product: productReducer,
    cart: cartReducer,
    user: userReducer
});