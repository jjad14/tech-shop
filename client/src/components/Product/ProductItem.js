import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';

import Rating from './Rating';

// product in a list (Home Screen)
const ProductItem = ({ product }) => {
    return (
        <Card className="my-3 p-3 rounded shadow">
            <Link to={`/product/${product._id}`}>
                <Card.Img src={product.image} variant="top" className="border"/>
            </Link>
            <Card.Body>
                <Link to={`/product/${product._id}`}>
                    <Card.Title as="div">
                        <strong className="text-primary">{product.name}</strong>  
                    </Card.Title>
                </Link>
                <Card.Text as="div">
                    <Rating rating={product.rating} text={`${product.numReviews} reviews`} color="red"/>
                </Card.Text>
                <Card.Text as="h4">${product.price}</Card.Text>
            </Card.Body>
        </Card>
    );
};

ProductItem.propTypes = {
    product: PropTypes.object.isRequired
};

export default ProductItem;
