import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Carousel, Image } from 'react-bootstrap';

import Loading from '../shared/Loading';
import Message from '../shared/Message';

import { getTopRatedProducts } from '../../actions/productActions';

const ProductCarousel = () => {
  const dispatch = useDispatch();

  const { topProducts, loadingTop } = useSelector((state) => state.product);
  const { errorCarousel } = useSelector((state) => state.error);

  useEffect(() => {
    dispatch(getTopRatedProducts());
  }, [dispatch]);

  return loadingTop ? (
    <Loading />
  ) : errorCarousel ? (
    <Message variant="danger">{errorCarousel}</Message>
  ) : (
    <Carousel pause='hover' className="bg-warning mb-3">
        {topProducts.map(product => (
            <Carousel.Item key={product._id}>
                <Link to={`/product/${product._id}`}>
                    <Image src={product.image} alt={product.name} fluid  className="mt-2"/>
                    <Carousel.Caption       
                        className="carousel-caption mb-5">
                            <h2>{product.name} (${product.price})</h2>
                    </Carousel.Caption>
                </Link>
            </Carousel.Item>
        ))}
    </Carousel>
  );
};

export default ProductCarousel;
