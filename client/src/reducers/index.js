import { combineReducers } from 'redux';

import productReducer from './productReducer';

// export all reducers
export default combineReducers({
    product: productReducer
});