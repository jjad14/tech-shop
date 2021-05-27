import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import Meta from '../shared/Meta';
import FormContainer from '../shared/Forms/FormContainer';
import { savePaymentMethod } from '../../actions/cartActions';
import CheckoutSteps from '../Checkout/CheckoutSteps';

const Payment = ({ history }) => {
  const dispatch = useDispatch();
  const shippingAddress = useSelector((state) => state.cart.shippingAddress);
  const [paymentMethod, setPaymentMethod] = useState('PayPal');

  // check if they have a shipping address or redirect back
  if (!shippingAddress) {
    history.push('/shipping');
  }

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(savePaymentMethod(paymentMethod));
    history.push('/placeorder');
  };

  return (
    <>
    <Meta title="TechShop | Payment"/>
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h3 className='text-center'>Payment Method</h3>
      <Form onSubmit={submitHandler}>
        <Form.Group className='text-center'>
          <Form.Label as='legend'>Select a Method</Form.Label>
          <Col className='d-flex flex-column align-items-start'>
            {/* Paypal  */}
            <Form.Check
              type='radio'
              label='PayPal'
              id='PayPal'
              name='paymentMethod'
              value='PayPal'
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
            {/* Stripe */}
            <Form.Check
              type='radio'
              label='Credit Card'
              id='CreditCard'
              name='paymentMethod'
              value='Credit Card'
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>
        <Button type="submit" variant="success" title='submit order' block>
          Continue
        </Button>
      </Form>
    </FormContainer>
    </>
  );
};

Payment.propTypes = {
  history: PropTypes.object,
};

export default Payment;
