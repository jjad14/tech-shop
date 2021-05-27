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
  const { errorProduct } = useSelector((state) => state.error);

  useEffect(() => {
    dispatch(getTopRatedProducts());
  }, [dispatch]);

  return loadingTop ? (
    <Loading />
  ) : errorProduct ? (
    <Message>{errorProduct}</Message>
  ) : (
    <Carousel pause='hover' className="bg-dark">
        {topProducts.map(product => (
            <Carousel.Item key={product._id}>
                <Link to={`/products/${product._id}`}>
                    <Image src={product.image} alt={product.name} fluid />
                    <Carousel.Caption       
                        className="carousel-caption">
                            <h2>{product.name}({product.price})</h2>
                    </Carousel.Caption>
                </Link>
            </Carousel.Item>
        ))}
    </Carousel>
  );
};

export default ProductCarousel;
