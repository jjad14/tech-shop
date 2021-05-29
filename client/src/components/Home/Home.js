import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import Loading from '../shared/Loading';
import Message from '../shared/Message';
import Paginate from '../shared/Paginate';
import Meta from '../shared/Meta';

import ProductCarousel from '../Product/ProductCarousel';
import ProductItem from '../Product/ProductItem';
import Filter from '../shared/Filter';
import { getProducts } from '../../actions/productActions';

const Home = ({ match }) => {
  const keyword = match.params.keyword;
  const brand = match.params.brand;
  const category = match.params.category;
  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const { products, pages, page, loading } = useSelector((state) => state.product);
  const { errorProduct } = useSelector((state) => state.error);

  useEffect(() => {
    dispatch(getProducts(keyword, pageNumber, brand, category));
  }, [dispatch, keyword, pageNumber, brand, category]);

  return (
    <>
      <Meta />
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to='/' className='btn btn-outline-dark'>
          Go Back
        </Link>
      )}
      { loading ? (
        <Loading />
      ) : errorProduct ? (
        <Message variant='danger'>{errorProduct}</Message>
      ) : (
        <>
          <Row>
            <Col md={3}>
              <Filter brandParam={brand} categoryParam={category}/>
            </Col>
            <Col md={9}>
              <Row>
                {products.map((product) => (
                  <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <ProductItem product={product} />
                  </Col>
                ))}
              </Row>
                {products.length === 0 && <Message>No Products Found...</Message>}
            </Col>
          </Row>
          <Paginate
            total={pages}
            page={page}
          />
        </>
      )}
    </>
  );
};

export default Home;
