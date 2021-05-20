import React from 'react';
import { Link } from 'react-router-dom';
import {
  Row,
  Col,
  ListGroup,
  Button,
  Card,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';

import Message from '../shared/Message';
import CartItem from './CartItem';

const Cart = ({ history }) => {
  // cart items from redux state
  const cartItems = useSelector((state) => state.cart.cartItems);
  const { errorCart } = useSelector((state) => state.error);

  const checkoutHandler = () => {
    history.push('/login?redirect=shipping');
  };

  return (
    <Row>
      <Col md={8}>
        <h2 className="text-center text-md-left">Shopping Cart</h2>
        { errorCart && <Message variant="success" exit>{errorCart}</Message>}
        { cartItems.length === 0 ? (
          <Message>
            <span>
              Your cart is empty. Click {' '}
              <Link to='/'>Here</Link> {' '}
              to check out our latest products!
            </span>
          </Message>
        ) : (
          <Card className='my-3 rounded shadow'>
            <ListGroup variant='flush'>
              {cartItems.map((item) => (
                <CartItem key={item.product} item={item}/>
              ))}
            </ListGroup>
          </Card>
        )}
      </Col>
      <Col md={4}>
        <Card className='my-3 rounded shadow'>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h4 className='text-center'>
                Subtotal ({cartItems.reduce((acc, item) => acc + (+item.qty), 0)})
                Items
              </h4>
              <hr />
              <p className='text-center'>
                Total:&nbsp;
                <strong>
                  $
                  {cartItems
                    .reduce((acc, item) => acc + (+item.qty) * item.price, 0)
                    .toFixed(2)}
                </strong>
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
                <Button variant="success"
                    type='button' 
                    className="btn-block" 
                    disabled={cartItems.length === 0}
                    onClick={checkoutHandler}>
                    Checkout
                </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default Cart;
