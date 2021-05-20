import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Routes from './components/Routing/Routes';
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
            <Routes />
          </Container>
        </main>
        <Footer />
    </BrowserRouter>
  );
}

export default App;
