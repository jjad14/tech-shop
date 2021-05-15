import asyncHandler from 'express-async-handler';

import Product from '../models/Product.js';

// GET api/products
// Get all products
// Public access
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
});

// GET api/products/:id
// Get product by id
// Public access
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
      throw new Error('No Product Found');
    }

    res.json(product);

});

export {
    getProducts,
    getProductById
};