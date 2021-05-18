import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2';
import { Link } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import Message from '../shared/Message';
import Loading from '../shared/Loading';
import { getOrderDetails, payOrder } from '../../actions/orderActions';
import { ORDER_PAY_RESET } from '../../constants/orderTypes';

const OrderConfirmation = ({ match }) => {
  const orderId = match.params.id;

  const [sdkReady, setSdkReady] = useState(false);

  const dispatch = useDispatch();

  const { order, loading, error, paymentSuccess } = useSelector((state) => state.order);

  useEffect(() => {
    const addPaypalScript = async () => {
      // getting clientId
      const { data : clientId} = await axios.get('/api/config/paypal');

      // dynamically adding that PayPal's script.
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=CAD`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      }
      document.body.appendChild(script);
    }

    if (!order || paymentSuccess || order._id !== orderId) {
      dispatch({type: ORDER_PAY_RESET});
      dispatch(getOrderDetails(orderId));
    } 
    else if (!order.isPaid) {
      if (!window.paypal) {
        addPaypalScript();
      } else {
        setSdkReady(true);
      }
    }

  }, [dispatch, order, orderId, paymentSuccess]) 

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult)
    dispatch(payOrder(orderId, paymentResult));
  };

  return loading ? (
    <Loading />
  ) : error ? (
    <Message variant='danger' exit>
      {error}
    </Message>
  ) : (
    <>
      <Row>
        <Col md={8}>
          <h4 className='text-center text-md-left ml-md-4'>
            Order: #{order._id}
          </h4>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <Card className='mt-1 mb-2 p-3 rounded shadow'>
                <Card.Header> Shipping</Card.Header>
                <Card.Body>
                  <Card.Title>Address:</Card.Title>
                  <Card.Text>
                    <strong>Name: </strong>
                    {order.user.name}
                    <br />
                    <strong>Email: </strong>
                    <a href={`malito:${order.user.email}`}>
                      {order.user.email}
                    </a>
                    <br />
                    <strong>Phone Number: </strong>
                    {order.shippingAddress.phoneNumber}
                    <br />
                    <strong>Street: </strong>
                    {order.shippingAddress.address}
                    <br />
                    <strong>City: </strong>
                    {order.shippingAddress.city}
                    <br />
                    <strong>Postal Code: </strong>
                    {order.shippingAddress.postalCode}
                    <br />
                    <strong>Country: </strong>
                    {order.shippingAddress.country}
                    <br />
                  </Card.Text>
                </Card.Body>
              </Card>
            </ListGroup.Item>
            <ListGroup.Item>
              <Card className='my-2 p-3 rounded shadow'>
                <Card.Header> Payment Method</Card.Header>
                <Card.Body>
                  <Card.Title>Method of Payment:</Card.Title>
                  <Card.Text>
                    {order.paymentMethod}
                    <br />

                    {order.isPaid ? (
                      <span className="text-success">Was Paid on {order.paidAt}</span>
                      ) : (
                      <span className="text-danger"><strong>Has Not Been Paid</strong></span>
                    )}
                  </Card.Text>
                </Card.Body>
              </Card>
            </ListGroup.Item>
            <ListGroup.Item>
              <Card className='my-2 p-3 rounded shadow'>
                <Card.Header> Order Items</Card.Header>
                <Card.Body>
                  {order.orderItems.length === 0 ? (
                    <Message>Your cart is empty</Message>
                  ) : (
                    <ListGroup variant='flush'>
                      {order.orderItems.map((item, index) => (
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
                <h4 className='text-center'>Order Summary</h4>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items:</Col>
                  <Col>${order.itemsPrice.toFixed(2)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping:</Col>
                  <Col
                    className={
                      order.shippingPrice.toFixed(2) === '0.00'
                        ? 'text-success'
                        : 'text-primary'
                    }>
                        {order.shippingPrice.toFixed(2) === '0.00' ? (<span>Free Shipping</span>) : (<span>${order.shippingPrice.toFixed(2)} </span>)}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax:</Col>
                  <Col>${order.taxPrice.toFixed(2)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total Price:</Col>
                  <Col>${order.totalPrice.toFixed(2)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                  <Row>
                    <Col><strong>Status:</strong></Col>                
                    <Col>                    
                        {order.isDelivered ? (
                        <p className="text-success">Delivered on {order.deliveredAt}</p>
                        ) : (
                        <p className="text-danger"><strong>Not Delivered
                          </strong></p>
                        )}
                    </Col>
                  </Row>
              </ListGroup.Item>
              {!order.isPaid && (
                <ListGroup.Item>
                  {loading && <Loading />}
                  {!sdkReady ? <Loading /> : (
                    <PayPalButton 
                      amount={order.totalPrice.toFixed(2)}
                      onSuccess={successPaymentHandler}
                      currency="CAD" 
                      style={{
                        color:  'blue',
                        shape:  'pill',
                        label:  'pay',
                        height: 40
                      }}
                    />
                  )}
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderConfirmation;
