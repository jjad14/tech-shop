import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const CheckoutSteps = ({ step1, step2, step3 }) => {
  return (
    <Nav className='justify-content-center mb-4'>
      <Nav.Item>
        <Nav.Link
          as={Link}
          to='/shipping'
          disabled={!step1}
        >
          Shipping
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link
          as={Link}
          to='/payment'
          disabled={!step2}
        >
          Payment
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link
          as={Link}
          to='/placeorder'
          disabled={!step3}
        >
          Place Order
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
};

CheckoutSteps.propTypes = {
  step1: PropTypes.bool,
  step2: PropTypes.bool,
  step3: PropTypes.bool,
  step4: PropTypes.bool,
};

export default CheckoutSteps;
