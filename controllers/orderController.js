import mongoose from 'mongoose';
import asyncHandler from 'express-async-handler';

import Order from '../models/Order.js';
import Product from '../models/Product.js';

// GET api/orders
// Create Order
// Private access
const addOrder = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
  } = req.body;

  let beforeTaxes = 0.0;
  let totalPrice = 0.0;
  let taxPrice = 0.0;
  let shippingPrice = 0.0;

  // map each item in cart to determine cost
  // use backend prices to prevent token manipulation
  await Promise.all(orderItems.map(async (item) => {
      // get item by cartitem id
      let lookupItem = await Product.findById(item.product);

      // overwrite cartItem price with the one from db
      // prevents cart price tampering
      item.price = lookupItem.price;

      // calculate taxes
      taxPrice += (item.price * 0.13) * item.qty;

      // calculate total before tax
      beforeTaxes += item.price * item.qty;  

      // determine shipping
      shippingPrice = beforeTaxes < 100 ? 19.99 : 0;

      // determine total cost
      totalPrice =  beforeTaxes + taxPrice + shippingPrice;
  }));

  // create order
  const order = new Order({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      taxPrice,
      shippingPrice,
      totalPrice
  });

  // save order
  const createdOrder = await order.save();

  // return order
  res.status(201).json(createdOrder);
  
});

const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  );

  if (order && (req.user.isAdmin || order.user._id.equals(req.user._id))) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

export {
    addOrder
};