import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';

import Spinner from '../layout/Spinner';
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
      {loading ? (
        <Spinner />
      ) : error ? (
        <h2>{error}</h2>
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
