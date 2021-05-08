import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap';

import Loading from '../shared/Loading';
import Message from '../shared/Message';
import { getProduct, clearProductDetails } from '../../actions/productActions';
import Rating from './Rating';

// individual product page
const Product = ({ match }) => {
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

  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>
      { !product._id || product._id !== match.params.id ? (
        <Loading />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          <Col md={5}>
            <Image src={product.image} alt={product.name} fluid />
          </Col>
          <Col md={4}>
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
          <Col md={3}>
            <Card className='p-3 rounded shadow'>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>${product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col
                      className={
                        product.countInStock > 0
                          ? 'text-success'
                          : 'text-danger'
                      }
                    >
                      {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button
                    variant={product.countInStock > 0 ? 'success' : 'secondary'}
                    disabled={product.countInStock === 0}
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
