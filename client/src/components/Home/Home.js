import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';

import Loading from '../shared/Loading';
import Message from '../shared/Message';
import Paginate from '../shared/Paginate';

import ProductCarousel from '../Product/ProductCarousel';
import ProductItem from '../Product/ProductItem';
import { getProducts } from '../../actions/productActions';

const Home = ({ match }) => {
  const keyword = match.params.keyword;
  const pageNumber = match.params.pageNumber || 1;
  
  const dispatch = useDispatch();

  const { products, pages, page } = useSelector((state) => state.product);
  const { errorProduct } = useSelector((state) => state.error);

  useEffect(() => {
    dispatch(getProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      {!keyword && <ProductCarousel />}
      <h2 className="text-center text-md-left">Latest Products</h2>
      {products.length === 0 ? (
        <Loading />
      ) : errorProduct ? (
        <Message variant="danger">{errorProduct}</Message>
      ) : (
        <>
          <Row>
          {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <ProductItem product={product} />
              </Col>
          ))}
          </Row>
          <Paginate 
            total={pages} 
            page={page} 
            // keyword={keyword ? keyword : ''}
            />
        </>
      )}
    </>
  );
};

export default Home;
