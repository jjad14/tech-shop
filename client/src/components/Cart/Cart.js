import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from 'react-bootstrap';

import Message from '../shared/Message';
import { addToCart, removeFromCart } from '../../actions/cartActions';

const Cart = ({ history }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  const removeItemHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    history.push('/login?redirect=shipping');
  };

  return (
    <Row>
      <Col md={8}>
        <h2>Shopping Cart</h2>
        {cartItems.length === 0 ? (
          <Message>
            No Items in Cart... {'  '}
            <Link to='/'>Go Back</Link>
          </Message>
        ) : (
          <Card className='my-3 rounded shadow'>
            <ListGroup variant='flush'>
              {cartItems.map((item) => (
                <ListGroup.Item key={item.product}>
                  <Row>
                    <Col md={2}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col md={3} className='mx-1'>
                      <Link
                        to={`/product/${item.product}`}
                        className='text-dark'
                      >
                        {item.name}
                      </Link>
                    </Col>
                    <Col md={2}>${item.price}</Col>
                    <Col md={3} className='p-0 mr-2'>
                      <Form.Control
                        as='select'
                        value={item.qty}
                        onChange={(e) =>
                          dispatch(
                            addToCart(item.product, Number(e.target.value))
                          )
                        }
                      >
                        {[...Array(item.inventory).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                    <Col md={1} className='p-0 m-0'>
                      <Button
                        className='float-right btn-md-inline btn-block'
                        onClick={() => removeItemHandler(item.product)}
                        type='button'
                        variant='danger'
                      >
                        <i className='fas fa-trash'></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
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
              {/* TODO: Get total price from backend */}
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
                    Proceed To Checkout
                </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default Cart;
