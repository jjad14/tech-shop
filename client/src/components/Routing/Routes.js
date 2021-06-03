import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import AdminRoute from './AdminRoute';

import Home from '../Home/Home';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import Login from '../Auth/Login';
import Register from '../Auth/Register';

// Lazy Loading Components
const Profile = React.lazy(() => import('../Profile/Profile'));
const Shipping = React.lazy(() => import('../Checkout/Shipping'));
const Payment = React.lazy(() => import('../Checkout/Payment'));
const PlaceOrder = React.lazy(() => import('../Checkout/PlaceOrder'));
const OrderConfirmation = React.lazy(() => import('../Checkout/OrderConfirmation'));

const UserList = React.lazy(() => import('../Users/UserList'));
const UserEdit = React.lazy(() => import('../Users/UserEdit'));
const ProductList = React.lazy(() => import('../Product/ProductList'));
const ProductEdit = React.lazy(() => import('../Product/ProductEdit'));
const OrderList = React.lazy(() => import('../Order/OrderList'));


const Routes = () => {
  return (
    <section className='container'>
      <Suspense fallback={<p>Loading...</p>}>
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
          <PrivateRoute path='/order/:id' component={OrderConfirmation} />
          <AdminRoute path='/admin/users' exact component={UserList} />
          <AdminRoute path='/admin/users/page/:pageNumber' component={UserList} />
          <AdminRoute path='/admin/user/:id/edit' component={UserEdit} />
          <AdminRoute path='/admin/products' exact component={ProductList} />
          <AdminRoute path='/admin/products/page/:pageNumber' exact component={ProductList} />
          <AdminRoute path='/admin/product/:id/edit' component={ProductEdit} />
          <AdminRoute path='/admin/orders' exact component={OrderList} />
          <AdminRoute path='/admin/orders/page/:pageNumber' component={OrderList} />
          <Route path='/page/:pageNumber' component={Home} />
          <Route path='/search/:keyword' exact component={Home} />
          <Route path='/search/:keyword/page/:pageNumber' component={Home} />
          <Route path='/brand/:brand' exact component={Home} />
          <Route path='/category/:category' exact component={Home} />
          <Route path='/brand/:brand/category/:category' component={Home} />
          <Route path='/' exact component={Home} />
        </Switch>
      </Suspense>
    </section>
  );
};

export default Routes;
