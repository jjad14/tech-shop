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

// DELETE api/products/:id
// Delete a product
// Private access (Admin)
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  // @TODO (Optioanl): Only admin that created the product can delete or update it

  if (!product) {
    res.status(404);
    throw new Error('No Product Found');
  }

  await product.remove();

  res.status(204).send();
});

export {
    getProducts,
    getProductById,
    deleteProduct
};