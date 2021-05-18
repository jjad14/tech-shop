import React from 'react';
import { Route, Switch } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import Home from '../Home/Home';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import Login from '../Auth/Login';
import Register from '../Auth/Register';
import Profile from '../Profile/Profile';
import Shipping from '../Checkout/Shipping';
import Payment from '../Checkout/Payment';
import PlaceOrder from '../Checkout/PlaceOrder';
import OrderConfirmation from '../Checkout/OrderConfirmation';

const Routes = () => {
    return (
        <section className="container">
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/cart" component={Cart} />
                <PrivateRoute path="/profile" component={Profile} />
                <Route path="/product/:id" component={Product} />
                <PrivateRoute path="/shipping" component={Shipping} />
                <PrivateRoute path="/payment" component={Payment} />
                <PrivateRoute path="/placeorder" component={PlaceOrder} />
                <PrivateRoute path="/order/:id" component={OrderConfirmation} />
                <Route path="/" exact component={Home} />
            </Switch>
      </section>
    );
};

export default Routes;
