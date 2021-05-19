import mongoose from 'mongoose';
import asyncHandler from 'express-async-handler';

import User from '../models/User.js';
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

  let itemsPrice = 0.0;
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
      itemsPrice += item.price * item.qty;  

      // determine shipping
      shippingPrice = itemsPrice < 100 ? 19.99 : 0;

      // determine total cost
      totalPrice =  itemsPrice + taxPrice + shippingPrice;
  }));

  // create order
  const order = new Order({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      taxPrice,
      shippingPrice,
      itemsPrice,
      totalPrice
  });

  // save order
  const createdOrder = await order.save();

  // return order
  res.status(201).json(createdOrder);
  
});

// GET api/orders/:id
// Get Order by Id
// Private access
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

// PUT api/orders/:id/pay
// Update Order to paid
// Private access
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order && (req.user.isAdmin || order.user._id.equals(req.user._id))) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address
    }

    const updatedOrder = await order.save();

    res.json(updatedOrder);

  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// GET api/orders/myorders
// Gets Currently logged in users Orders
// Private access
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id});

  if (!orders) {
    res.status(404);
    throw new Error('No Orders Found');
  }

  res.json(orders);
  
});

export {
    addOrder,
    getOrderById,
    updateOrderToPaid,
    getMyOrders
};