import asyncHandler from 'express-async-handler';

import Product from '../models/Product.js';
import Order from '../models/Order.js';

// GET api/products
// Get all products
// Public access
const getProducts = asyncHandler(async (req, res) => {
  // Pagination Config
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;

  // Filter search, check all cases for brands and category
  const filter =
    req.query.brand && req.query.category
      ? {
          $and: [
            {
              brand: {
                $regex: req.query.brand,
                $options: 'i', // case insensitive
              },
            },
            {
              category: {
                $regex: req.query.category,
                $options: 'i', // case insensitive
              },
            },
          ],
        }
      : req.query.brand && !req.query.category
      ? {
        brand: {
          $regex: req.query.brand,
          $options: 'i',
        },
      }
      : !req.query.brand && req.query.category
      ? {
        category: {
          $regex: req.query.category,
          $options: 'i',
        },
      }
      : {};

  // Keyword searches by Name and Brand
  const keyword = req.query.keyword
    ? {
        $or: [
          {
            name: {
              $regex: req.query.keyword,
              $options: 'i', // case insensitive
            },
          },
          {
            brand: {
              $regex: req.query.keyword,
              $options: 'i', // case insensitive
            },
          },
        ],
      }
    : {};

  const count = await Product.countDocuments({ ...keyword, ...filter });

  const products = await Product.find({ ...keyword, ...filter })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  if (!products) {
    res.status(404);
    throw new Error('No Products Found');
  }

  res.json({ products, page, pages: Math.ceil(count / pageSize) });
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

const getBrands = asyncHandler(async (req, res) => {
  const products = await Product.find();

  const brands = [].concat.apply(
    [],
    products.map((product) => product.brand.toString())
  );

  const filteredArray = brands.filter(function (item, pos) {
    return brands.indexOf(item) == pos;
  });

  res.json(filteredArray);
});

const getCategories = asyncHandler(async (req, res) => {
  const products = await Product.find();

  const categories = [].concat.apply(
    [],
    products.map((product) => product.category.toString())
  );

  const filteredArray = categories.filter(function (item, pos) {
    return categories.indexOf(item) == pos;
  });

  res.json(filteredArray);
});

// DELETE api/products/:id
// Delete a product
// Private access (Admin)
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  // @TODO (Optional): Only admin that created the product can delete or update it

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
    description: 'Sample description',
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

// POST api/products/:id/reviews
// Create a review
// Private access
const createReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);
  const orders = await Order.find({ user: req.user._id });

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  // Array of product ids that the user has ordered
  const ordersItems = [].concat.apply(
    [],
    orders.map((order) =>
      order.orderItems.map((item) => item.product.toString())
    )
  );

  // check if user has bought the product
  const hasBought = ordersItems.includes(product._id.toString());

  // only users that have bought the product can review it
  if (!hasBought) {
    res.status(400);
    throw new Error('You can only review products you have bought');
  }

  // check if user already reviewed the product
  const alreadyReviewed = product.reviews.find(
    (r) => r.user.toString() === req.user._id.toString()
  );

  // users who bought the product can only review it once
  if (alreadyReviewed) {
    res.status(400);
    throw new Error('You can only review each product once');
  }

  // create review instance
  const review = {
    name: req.user.name,
    rating: Number(rating),
    comment,
    user: req.user._id,
  };

  // push the review to the products.reviews array
  product.reviews.push(review);

  // updated product.numReviews count
  product.numReviews = product.reviews.length;

  // recalculate product rating
  product.rating =
    product.reviews.reduce((acc, item) => item.rating + acc, 0) /
    product.reviews.length;

  // save product
  await product.save();

  res.status(204).send();
});

// GET api/products/top
// Get Top rated Products
// Public
const getTopRated = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3);

  if (!products) {
    res.status(404);
    throw new Error('Products not found');
  }

  res.json(products);
});

export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createReview,
  getTopRated,
  getBrands,
  getCategories,
};
