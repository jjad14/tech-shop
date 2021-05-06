import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';

import Rating from './Rating';

const ProductItem = ({ product }) => {
    return (
        <Card className="my-3 p-3 rounded shadow">
            <a href={`/product/${product._id}`}>
                <Card.Img src={product.image} variant="top" />
            </a>
            <Card.Body>
                <a href={`/product/${product._id}`}>
                    <Card.Title as="div">
                        <strong className="text-primary">{product.name}</strong>  
                    </Card.Title>
                </a>
                <Card.Text as="div">
                    <Rating rating={product.rating} text={`${product.numReviews} reviews`} color="red"/>
                </Card.Text>
                <Card.Text as="h3">${product.price}</Card.Text>
            </Card.Body>
        </Card>
    );
};

ProductItem.propTypes = {
    product: PropTypes.object.isRequired
};

export default ProductItem;
