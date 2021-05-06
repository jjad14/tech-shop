import React from 'react';
import { Row, Col } from 'react-bootstrap';

import products from '../../products';
import ProductItem from '../Product/ProductItem';

const Home = () => {
    return (
        <>
            <h1>Check out our Latest Products</h1>
            <Row>
                {products.map(product => (
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                        <ProductItem product={product}/>
                    </Col>
                ))}
            </Row>
        </>
    );
};

export default Home;
