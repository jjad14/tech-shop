import React from 'react';
import { Route, Switch } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import AdminRoute from './AdminRoute';

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
import UserList from '../Users/UserList';
import UserEdit from '../Users/UserEdit';
import ProductList from '../Product/ProductList';
import ProductEdit from '../Product/ProductEdit';
import OrderList from '../Order/OrderList';

const Routes = () => {
  return (
    <section className='container'>
      <Switch>
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
        <Route path='/cart' component={Cart} />
        <Route path='/product/:id' component={Product} />
        <PrivateRoute path='/profile' exact component={Profile} />
        <PrivateRoute path='/profile/page/:pageNumber' component={Profile} />
        <PrivateRoute path='/shipping' component={Shipping} />
        <PrivateRoute path='/payment' component={Payment} />
        <PrivateRoute path='/placeorder' component={PlaceOrder} />
        <AdminRoute path='/admin/users' component={UserList} />
        <AdminRoute path='/admin/user/:id/edit' component={UserEdit} />
        <AdminRoute path='/admin/products' exact component={ProductList} />
        <AdminRoute path='/admin/products/page/:pageNumber' exact component={ProductList} />
        <AdminRoute path='/admin/product/:id/edit' component={ProductEdit} />
        <AdminRoute path='/admin/orders' component={OrderList} />
        <PrivateRoute path='/order/:id' component={OrderConfirmation} />
        <Route path='/page/:pageNumber' component={Home} />
        <Route path='/search/:keyword' exact component={Home} />
        <Route path='/search/:keyword/page/:pageNumber' component={Home} />
        <Route path='/' exact component={Home} />
      </Switch>
    </section>
  );
};

export default Routes;
