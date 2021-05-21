import asyncHandler from 'express-async-handler';

import Product from '../models/Product.js';

// GET api/products
// Get all products
// Public access
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({});

    if (!products) {
      res.status(404);
      throw new Error('No Products Found');
    }

    res.json(products);
});

// GET api/products/:id
// Get product by id
// Public access
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        res.status(404);
      throw new Error('No Product Found');
    }

    res.json(product);

});

export {
    getProducts,
    getProductById
};