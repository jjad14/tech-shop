import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';

import Loading from '../shared/Loading';
import Message from '../shared/Message';
import ProductItem from '../Product/ProductItem';
import { getProducts } from '../../actions/productActions';

const Home = ({ match }) => {
  const dispatch = useDispatch();

  const keyword = match.params.keyword;

  const { products } = useSelector((state) => state.product);
  const { errorProduct } = useSelector((state) => state.error);

  useEffect(() => {
    dispatch(getProducts(keyword));
  }, [dispatch, keyword]);

  return (
    <>
      <h2 className="text-center text-md-left">Latest Products</h2>
      {products.length === 0 ? (
        <Loading />
      ) : errorProduct ? (
        <Message variant="danger">{errorProduct}</Message>
      ) : (
        <Row>
        {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <ProductItem product={product} />
            </Col>
        ))}
        </Row>
      )}
    </>
  );
};

export default Home;
