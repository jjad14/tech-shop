import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';

import Loading from '../shared/Loading';
import Message from '../shared/Message';
import ProductItem from '../Product/ProductItem';
import { getProducts } from '../../actions/productActions';

const Home = () => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.product);
  const { products, loading, error } = productList;

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <>
      <h1>Latest Products</h1>
      {/* @todo: infer loading instead, products.length === 0  */}
      {loading ? (
        <Loading />
      ) : error ? (
        <Message variant="danger">{error}</Message>
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
