import React, { useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './components/Home/Home';
import Product from './components/Product/Product';
import Cart from './components/Cart/Cart';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Profile from './components/Profile/Profile';
import Shipping from './components/Checkout/Shipping';
import Payment from './components/Checkout/Payment';
import PlaceOrder from './components/Checkout/PlaceOrder';
import { getUserDetails } from './actions/userActions';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserDetails());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Header />
        <main className="py-3">
          <Container>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/profile" component={Profile} />
            <Route path="/product/:id" component={Product} />
            <Route path="/cart" component={Cart} />
            <Route path="/shipping" component={Shipping} />
            <Route path="/payment" component={Payment} />
            <Route path="/placeorder" component={PlaceOrder} />
            <Route path="/" exact component={Home} />
          </Container>
        </main>
        <Footer />
    </BrowserRouter>
  );
}

export default App;
