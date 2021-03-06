import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Button, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import Meta from '../shared/Meta';
import Message from '../shared/Message';
import CheckoutSteps from '../Checkout/CheckoutSteps';

import { createOrder } from '../../actions/orderActions';
import { ORDER_CREATE_RESET } from '../../constants/orderTypes';

const PlaceOrder = ({ history }) => {
  const dispatch = useDispatch();
  
  const cart = useSelector((state) => state.cart);

  // redirect if user has no shipping address or payment method
  if (!cart.shippingAddress.address) {
    history.push('/shipping')
  } else if (!cart.paymentMethod) {
    history.push('/payment')
  }

  const userInfo = useSelector(state => 
    state.user.userInfo
  );

  const { createdOrder, success } = useSelector(state => 
    state.order  
  );
  const { errorOrder } = useSelector((state) => state.error);

  // calculate prices
  const itemsPrice = cart.cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );
  const taxPrice = 0.13 * itemsPrice;
  const shippingPrice = itemsPrice >= 100 ? 0 : 19.99;
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  useEffect(() => {
    // if order is successfully created redirect to confirmation page
    if (success) {
      history.push(`/order/${createdOrder._id}`)

      dispatch({ type: ORDER_CREATE_RESET })
    }
  }, [dispatch, userInfo, history, createdOrder, success])


  const placeOrderHandler = (e) => {
    dispatch(createOrder({
      orderItems: cart.cartItems,
      shippingAddress: cart.shippingAddress,
      paymentMethod: cart.paymentMethod,
    }));
  };

  return (
    <>
      <Meta title="TechShop | Place Order"/>
      {errorOrder && <Message variant="danger">{errorOrder}</Message>}
      <CheckoutSteps step1 step2 step3 />
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <Card className='mt-1 mb-2 p-3 rounded shadow'>
                <Card.Header>
                  {' '}
                  Shipping
                </Card.Header>
                <Card.Body>
                  <Card.Title>Address:</Card.Title>
                  <Card.Text>
                    {cart.shippingAddress.address}, {cart.shippingAddress.city},{' '}
                    {cart.shippingAddress.postalCode},{' '}
                    {cart.shippingAddress.country}
                  </Card.Text>
                </Card.Body>
              </Card>
            </ListGroup.Item>
            <ListGroup.Item>
              <Card className='my-2 p-3 rounded shadow'>
                <Card.Header>
                  {' '}
                  Payment Method
                </Card.Header>
                <Card.Body>
                  <Card.Title>Method of Payment:</Card.Title>
                  <Card.Text>{cart.paymentMethod}</Card.Text>
                </Card.Body>
              </Card>
            </ListGroup.Item>
            <ListGroup.Item>
              <Card className='my-2 p-3 rounded shadow'>
                <Card.Header>
                  {' '}
                  Order Items
                </Card.Header>
                <Card.Body>
                    {cart.cartItems.length === 0 ? (
                      <Message>Your cart is empty</Message>
                    ) : (
                      <ListGroup variant='flush'>
                        {cart.cartItems.map((item, index) => (
                          <ListGroup.Item key={`${item._id}-${index}`}>
                            <Row>
                              <Col md={2}>
                                <Image
                                  src={item.image}
                                  alt={item.name}
                                  fluid
                                  rounded
                                />
                              </Col>
                              <Col>
                                <Link
                                  to={`/product/${item._id}`}
                                  className='text-primary'
                                >
                                  {item.name}
                                </Link>
                              </Col>
                              <Col md={4}>
                                {item.qty} &times; ${item.price} = $
                                {item.qty * item.price}
                              </Col>
                            </Row>
                          </ListGroup.Item>
                        ))}
                      </ListGroup>
                    )}
                </Card.Body>
              </Card>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card className='my-3 p-3 rounded shadow'>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h3 className='text-center'>Order Summary</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items:</Col>
                  <Col>${itemsPrice.toFixed(2)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping:</Col>
                  <Col>${shippingPrice.toFixed(2)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax:</Col>
                  <Col>${taxPrice.toFixed(2)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total Price:</Col>
                  <Col>${totalPrice.toFixed(2)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type='button'
                  variant="success"
                  disabled={cart.cartItems.length === 0}
                  onClick={placeOrderHandler}
                  block
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrder;
