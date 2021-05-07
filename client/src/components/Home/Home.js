import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Row, Col } from 'react-bootstrap';

import ProductItem from '../Product/ProductItem';

const Home = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const res = await axios.get('/api/products');

            setProducts(res.data);
        };

        fetchProducts();
    }, []);

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