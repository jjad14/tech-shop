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

// POST api/products
// Create a product
// Private access (Admin)
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    user: req.user._id,
    name: 'Sample name',
    price: 0,
    image: '/images/sample.jpg',
    brand: 'Sample Brand',
    category: 'Sample Category',
    inventory: 0,
    numReviews: 0,
    description: 'Sample description'
  });

  const createdProduct = await product.save();

  res.status(201).json(createdProduct);
});

// PUT api/products/:id
// Update a product
// Private access (Admin)
const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    image,
    brand,
    category,
    inventory,
  } = req.body;

  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  product.name = name;
  product.price = price;
  product.description = description;
  product.image = image;
  product.brand = brand;
  product.category = category;
  product.inventory = inventory;

  const updatedProduct = await product.save();

  res.json(updatedProduct);

});

export {
    getProducts,
    getProductById,
    deleteProduct,
    createProduct,
    updateProduct
};