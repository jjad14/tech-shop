import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from 'react-bootstrap';

import Loading from '../shared/Loading';
import Message from '../shared/Message';

import { getProduct, createReview } from '../../actions/productActions';
import { addToCart } from '../../actions/cartActions';
import Rating from './Rating';
import { PRODUCT_CREATE_REVIEW_RESET } from '../../constants/productTypes';

// individual product page
const Product = ({ history, match }) => {
  const [qty, setQty] = useState(1);
  const [showMessage, setShowMessage] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const dispatch = useDispatch();

  const { product, reviewCreated } = useSelector((state) => state.product);
  const { errorProduct, errorCart } = useSelector((state) => state.error);

  const { userInfo } = useSelector((state) => state.user);
  const { errorReview } = useSelector((state) => state.error);

  useEffect(() => {
    if (reviewCreated) {
      alert('Review has been submitted');
      setRating(0);
      setComment('');
      dispatch({type: PRODUCT_CREATE_REVIEW_RESET});
    }

    dispatch(getProduct(match.params.id));
  }, [dispatch, match.params.id, reviewCreated]);

  const submitReviewHandler = (e) => {
    e.preventDefault();

    dispatch(createReview(match.params.id, {rating, comment}));
  };

  const submitHandler = () => {
    dispatch(addToCart(product._id, qty));
    setQty((prevState) => prevState + 1);

    if (!errorCart) {
      setShowMessage(true);
    }
  };

  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>
      {showMessage && (
        <Message variant='success' exit>
          Item has Been Added to Cart
        </Message>
      )}
      {/* Error Adding Item to Cart */}
      {errorCart && (
        <Message variant='success' exit>
          {errorCart}
        </Message>
      )}
      {!product._id && !errorProduct ? (
        <Loading />
      ) : errorProduct ? (
        <Message variant='danger'>{errorProduct}</Message>
      ) : (
        <>
          <Row>
            <Col lg={6} md={12} sm={12} className='product-page-section'>
              <Image src={product.image} alt={product.name} fluid thumbnail />
            </Col>
            <Col lg={3} md={12} sm={12} className='product-page-section'>
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
            <Col lg={3} md={3} sm={12} className='product-page-section'>
              <Card className='p-3 rounded shadow'>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <Row>
                      <Col className='product-page-section'>Price:</Col>
                      <Col className='product-page-section'>
                        <strong>${product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col className='product-page-section'>Status:</Col>
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
                      disabled={
                        product.inventory === 0 || qty > product.inventory
                      }
                      block
                    >
                      Add To Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col lg={6} md={12}>
              <h3 className='text-center text-md-left'>Reviews</h3>
              {product.reviews.length === 0 && (
                <Message variant='danger'>This product has no reviews</Message>
              )}

              <ListGroup variant='flush'>
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong class='text-capitalize'>{review.name}</strong>
                    <Rating rating={review.rating} color='red' />
                    <p class='font-weight-light'>
                      {review.createdAt.substring(0, 10)}
                    </p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h5 className='text-center text-md-left'>
                    Purchased this item? Write a Review
                  </h5>
                  {errorReview && (
                    <Message variant='danger'>{errorReview}</Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitReviewHandler}>
                      <Form.Group control='rating'>
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as='select'
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value=''>Rate this product</option>
                          <option value='1'>1 - Poor</option>
                          <option value='2'>2 - Fair</option>
                          <option value='3'>3 - Average</option>
                          <option value='4'>4 - Good</option>
                          <option value='5'>5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId='comment'>
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as='textarea'
                          row={4}
                          value={comment}
                          placeholder='Let us know what you think'
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button type='submit' variant='primary' block>
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message variant='info'>
                      Please <Link to='/login'>Login</Link> to write a review
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default Product;
