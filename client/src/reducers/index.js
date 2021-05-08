import { combineReducers } from 'redux';

import productReducer from './productReducer';
import cartReducer from './cartReducer';

// export all reducers
export default combineReducers({
    product: productReducer,
    cart: cartReducer
});