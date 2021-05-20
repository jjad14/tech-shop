import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap';

import Loading from '../shared/Loading';
import Message from '../shared/Message';
import { getProduct } from '../../actions/productActions';
import { addToCart } from '../../actions/cartActions';
import Rating from './Rating';

// individual product page
const Product = ({ history, match }) => {
  const [qty, setQty] = useState(1);
  const [showMessage, setShowMessage] = useState(false);
  
  const dispatch = useDispatch();
  
  const { product } = useSelector((state) => state.product);
  const { errorProduct, errorCart } = useSelector((state) => state.error);

  useEffect(() => {
    dispatch(getProduct(match.params.id));
  }, [dispatch, match.params.id]);
  
  const submitHandler = () => {
    
    dispatch(addToCart(product._id, qty));
    setQty(prevState => prevState + 1);

    if (!errorCart) {
      setShowMessage(true);
    }
  };
  // || product._id !== match.params.id

  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>
      { showMessage && <Message variant="success" exit>Item has Been Added to Cart</Message>}
      {/* Error Adding Item to Cart */}
      { errorCart && <Message variant="success" exit>{errorCart}</Message>}
      { !product._id && !errorProduct ? (
        <Loading />
      ) : errorProduct ? (
        <Message variant='danger'>{errorProduct}</Message>
      ) : (
        <Row>
          <Col md={6} className="product-page-section">
            <Image src={product.image} alt={product.name} fluid />
          </Col>
          <Col md={3} className="product-page-section">
            <Card className='p-3 rounded shadow'>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h4>{product.name}</h4>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    rating={product.rating}
                    text={`${product.numReviews} reviews`}
                    color='red'
                  />
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Price:</strong> ${product.price}
                </ListGroup.Item>
                <ListGroup.Item>{product.description}</ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
          <Col md={3} className="product-page-section">
            <Card className='p-3 rounded shadow'>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <Row>
                    <Col className="product-page-section">Price:</Col>
                    <Col className="product-page-section">
                      <strong>${product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col className="product-page-section">Status:</Col>
                    <Col
                      className={
                        product.inventory > 0
                          ? 'text-success product-page-section'
                          : 'text-danger product-page-section'
                      }
                    >
                      {product.inventory > 0 ? 'In Stock' : 'Out of Stock'}
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button
                    onClick={submitHandler}
                    variant={product.inventory > 0 ? 'success' : 'secondary'}
                    disabled={product.inventory === 0 || qty > product.inventory}
                    block
                  >
                    Add To Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default Product;
