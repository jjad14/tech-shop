import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './reducers';


const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

const initialState = {
  cart: { cartItems: cartItemsFromStorage}
};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

// subscription
let currentState = store.getState();

// keep track of the previous and current state to compare changes
store.subscribe(() => {
  let previousState = currentState;
  currentState = store.getState();

  // if the cartItems change - overwrite localStorage
  if (previousState.cart.cartItems !== currentState.cart.cartItems) {
    localStorage.setItem(
      'cartItems',
      JSON.stringify(currentState.cart.cartItems)
    )
  }
 
});

export default store;
