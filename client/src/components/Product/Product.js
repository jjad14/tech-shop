import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap';

import Loading from '../shared/Loading';
import Message from '../shared/Message';
import { getProduct, clearProductDetails } from '../../actions/productActions';
import { addToCart } from '../../actions/cartActions';
import Rating from './Rating';

// @Todo: pass product id and quantity to reducer
// anytime user adds product to cart from this page, overwrite the existing product in cart if there is one


// individual product page
const Product = ({ history, match }) => {
  const [qty, setQty] = useState(1);
  const [showMessage, setShowMessage] = useState(false);

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.product);
  const { product, error } = productDetails;

  useEffect(() => {
    dispatch(getProduct(match.params.id));

    // equivalent to implementing componentWillUnmount
    return () => {
      dispatch(clearProductDetails());
    };
  }, [dispatch, match.params.id]);


  const submitHandler = () => {
    
    dispatch(addToCart(product._id, qty));

    setShowMessage(true);
  };

  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>
      { showMessage && <Message variant="success" exit>Item has Been Added to Cart</Message>}
      { !product._id || product._id !== match.params.id ? (
        <Loading />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
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
                { product.inventory > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col className="product-page-section">Quantity</Col>
                      <Col className="product-page-section">
                        <Form.Control 
                          as='select' 
                          value={qty}
                          className="form-control-select"
                          onChange={(e) => setQty(e.target.value)}>
                          {                        
                          [...Array(product.inventory).keys()].map(x => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            ))
                          }
                          </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}
                <ListGroup.Item>
                  <Button
                    onClick={submitHandler}
                    variant={product.inventory > 0 ? 'success' : 'secondary'}
                    disabled={product.inventory === 0}
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
