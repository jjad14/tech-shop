import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './reducers';
import { initialUserState } from './reducers/userReducer';
import { initialCartState } from './reducers/cartReducer';


const { userInfo, cartItems, shippingAddress } = localStorage;

const initialState = {
  cart: {
    cartItems: cartItems ? JSON.parse(cartItems) : [],
    shippingAddress: shippingAddress
    ? JSON.parse(shippingAddress)
    : { ...initialCartState.shippingAddress },
  },
  user: {
    ...initialUserState,
    userInfo: userInfo ? JSON.parse(userInfo) : null,
  }
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

  if (previousState.cart.shippingAddress !== currentState.cart.shippingAddress) {
    localStorage.setItem(
      'shippingAddress',
      JSON.stringify(currentState.cart.shippingAddress)
    );
  }
});

export default store;
