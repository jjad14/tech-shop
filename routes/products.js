import express from 'express';
import asyncHandler from 'express-async-handler';

import Product from '../models/Product.js';

const router = express.Router();

// GET api/products
// Get all products
// Public access
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const products = await Product.find({});

    // @todo: return error if no products

    res.json(products);
  })
);

// GET api/products/:id
// Get product by id
// Public access
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'No Product Found' });
    }

    res.json(product);
  })
);






export default router;
