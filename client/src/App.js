import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './components/Home/Home';
import Product from './components/Product/Product';
import Cart from './components/Cart/Cart';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
        <main className="py-3">
          <Container>
            <Route path="/" exact component={Home} />
            <Route path="/product/:id" component={Product} />
            <Route path="/cart" component={Cart} />
          </Container>
        </main>
        <Footer />
    </BrowserRouter>
  );
}

export default App;
