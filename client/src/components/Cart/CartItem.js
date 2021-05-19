import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
    Row,
    Col,
    ListGroup,
    Image,
    Button,
  } from 'react-bootstrap';

import { addToCart, removeFromCart } from '../../actions/cartActions';

// single cart item, child component for Cart.js
const CartItem = ({ item: {product, image, name, price, qty, inventory}}) => {  
    const [quantity, setQty] = useState(qty);

    const dispatch = useDispatch();
    
    useEffect(() => { 
        dispatch(addToCart(product, quantity));
    }, [dispatch, quantity, product] );

    const removeItemHandler = (id) => {
        dispatch(removeFromCart(id));
    };

    const incrementHandler = () => {
        if (quantity < inventory ) {
            setQty(prevCount => prevCount + 1);
        }
    };

    const decrementHandler = () => {
        if (quantity > 1) {
            setQty(prevCount => prevCount - 1);
        } else {
            // remove from cart
            dispatch(removeFromCart(product));
        }

    };

    return (
        <ListGroup.Item>
        <Row>
          <Col md={2}>
            <Image src={image} alt={name} fluid rounded />
          </Col>
          <Col md={3} className='mx-1'>
            <Link
              to={`/product/${product}`}
              className='text-dark'
            >
              <p className="text-center text-md-left">{name}</p>
            </Link>
          </Col>
          <Col md={2}><p className="text-center text-md-left">${price}</p></Col>
          <Col sm={12} md={3} className='p-md-0 mt-2 mt-md-0'>
            <Row>
              <div className="ml-2 w-100">
                  <div className="input-group mb-3 d-flex justify-content-center">
                    <div className="input-group-prepend mr-2">
                        <Button type="button" variant="danger" onClick={decrementHandler} size="sm">
                            <i className="fas fa-minus"></i>
                        </Button>
                    </div>
                    <div>
                        <p className="cart-quantity m-1 text-center">{quantity}</p>
                    </div>
                    <div className="input-group-append ml-2">
                        <Button type="button" variant="success" onClick={incrementHandler} disabled={quantity === inventory} size="sm">
                            <i className="fas fa-plus"></i>
                        </Button>
                      </div>
                  </div>
              </div>
            </Row>
          </Col>
          <Col md={1} className='p-0 m-0 mt-1 ml-md-3'>
            <Button
              className='trash-button float-right btn-md-inline btn-block'
              onClick={() => removeItemHandler(product)}
              type='button'
              size="sm"
              variant='danger'
            >
              <i className='fas fa-trash'></i>
            </Button>
          </Col>
        </Row>
      </ListGroup.Item>
    );
};

export default CartItem;
