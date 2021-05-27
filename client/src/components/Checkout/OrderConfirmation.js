import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2';
import { Link } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import Meta from '../shared/Meta';
import Message from '../shared/Message';
import Loading from '../shared/Loading';

import { getOrderDetails, payOrder, deliverOrder } from '../../actions/orderActions';
import { emptyCartItems } from '../../actions/cartActions';
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from '../../constants/orderTypes';

const OrderConfirmation = ({ history, match }) => {
  const orderId = match.params.id;

  const [sdkReady, setSdkReady] = useState(false);

  const dispatch = useDispatch();

  const { orderDetails, loading, paymentSuccess, orderDelivered } = useSelector(
    (state) => state.order
  );
  const { userInfo } = useSelector(state => state.user);
  const { errorOrder, errorPayment } = useSelector((state) => state.error);

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    }

    const addPaypalScript = async () => {
      // getting clientId
      const { data: clientId } = await axios.get('/api/config/paypal');

      // dynamically adding that PayPal's script.
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=CAD`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (!orderDetails || paymentSuccess || orderDelivered || orderDetails._id !== orderId) {
      dispatch({type: ORDER_PAY_RESET});
      dispatch({type: ORDER_DELIVER_RESET});
      dispatch(getOrderDetails(orderId));
      dispatch(emptyCartItems());
    } else if (!orderDetails.isPaid) {
      if (!window.paypal) {
        addPaypalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, orderDetails, orderId, paymentSuccess, orderDelivered, history, userInfo]);

  const deliverHandler = () => {
    dispatch(deliverOrder());
  };

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(orderId, paymentResult));
  };

  // orderDetails.user takes longer to fetch, check if the overall orderDetails is fetched
  // as well as the user object inside
  return errorOrder ? (
    <Message variant='danger'>
    {errorOrder}
    </Message>
  ) : !orderDetails || !orderDetails.user ? (
    <Loading />
  ) : (
    <>
      <Meta title="TechShop | Confirm Order"/>
      <Row>
        <Col md={8}>
          <h4 className='text-center text-md-left ml-md-4'>
            Order: #{orderDetails._id}
          </h4>
          {errorPayment && <Message variant="danger">{errorPayment}</Message>}
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <Card className='mt-1 mb-2 p-3 rounded shadow'>
                <Card.Header> Shipping</Card.Header>
                <Card.Body>
                  <Card.Title>Address:</Card.Title>
                  <Card.Text>
                    <strong>Name: </strong>
                    {orderDetails.user.name}
                    <br />
                    <strong>Email: </strong>
                    <a href={`malito:${orderDetails.user.email}`}>
                      {orderDetails.user.email}
                    </a>
                    <br />
                    <strong>Phone Number: </strong>
                    {orderDetails.shippingAddress.phoneNumber}
                    <br />
                    <strong>Street: </strong>
                    {orderDetails.shippingAddress.address}
                    <br />
                    <strong>City: </strong>
                    {orderDetails.shippingAddress.city}
                    <br />
                    <strong>Postal Code: </strong>
                    {orderDetails.shippingAddress.postalCode}
                    <br />
                    <strong>Country: </strong>
                    {orderDetails.shippingAddress.country}
                    <br />
                  </Card.Text>
                </Card.Body>
              </Card>
            </ListGroup.Item>
            <ListGroup.Item>
              <Card className='my-2 p-3 rounded shadow'>
                <Card.Header>Payment</Card.Header>
                <Card.Body>
                  <Card.Text>
                    <strong>Method of Payment: </strong>{orderDetails.paymentMethod}
                    <br />
                    <strong>Payment Status: </strong>
                    {orderDetails.isPaid ? (
                      <span className='text-success'>
                        Was Paid on {orderDetails.paidAt}
                      </span>
                    ) : (
                      <span className='text-danger'>
                        <strong>Has Not Been Paid</strong>
                      </span>
                    )}
                  </Card.Text>
                </Card.Body>
              </Card>
            </ListGroup.Item>
            <ListGroup.Item>
              <Card className='my-2 p-3 rounded shadow'>
                <Card.Header> Order Items</Card.Header>
                <Card.Body>
                  {orderDetails.orderItems.length === 0 ? (
                    <Message>Your cart is empty</Message>
                  ) : (
                    <ListGroup variant='flush'>
                      {orderDetails.orderItems.map((item, index) => (
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
                  <Col>${orderDetails.itemsPrice.toFixed(2)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping:</Col>
                  <Col
                    className={
                      orderDetails.shippingPrice.toFixed(2) === '0.00'
                        ? 'text-success'
                        : 'text-primary'
                    }
                  >
                    {orderDetails.shippingPrice.toFixed(2) === '0.00' ? (
                      <span>Free Shipping</span>
                    ) : (
                      <span>${orderDetails.shippingPrice.toFixed(2)} </span>
                    )}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax:</Col>
                  <Col>${orderDetails.taxPrice.toFixed(2)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total Price:</Col>
                  <Col>${orderDetails.totalPrice.toFixed(2)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>
                    <strong>Status:</strong>
                  </Col>
                  <Col>
                    {orderDetails.isDelivered ? (
                      <p className='text-success mb-0'>
                        Delivered on {orderDetails.deliveredAt}
                      </p>
                    ) : (
                      <p className='text-danger mb-0'>
                        <strong>Not Delivered</strong>
                      </p>
                    )}
                  </Col>
                </Row>
              </ListGroup.Item>
              {!orderDetails.isPaid && (
                <ListGroup.Item>
                  {loading && <Loading />}
                  {!sdkReady ? (
                    <Loading />
                  ) : (
                    <PayPalButton
                      amount={orderDetails.totalPrice.toFixed(2)}
                      onSuccess={successPaymentHandler}
                      currency='CAD'
                      style={{
                        color: 'blue',
                        shape: 'pill',
                        label: 'pay',
                        height: 40,
                      }}
                    />
                  )}
                </ListGroup.Item>
              )}
              {userInfo && userInfo.isAdmin && orderDetails.isPaid && !orderDetails.isDelivered && (
                <ListGroup.Item>
                  <Button type="button" block onClick={deliverHandler}>
                    Mark as Delivered
                  </Button>
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
