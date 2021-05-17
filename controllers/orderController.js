import mongoose from 'mongoose';
import asyncHandler from 'express-async-handler';

import Order from '../models/Order.js';
import Product from '../models/Product.js';

// GET api/orders
// Create Order
// Private access
const addOrder = asyncHandler(async (req, res) => {
    const { orderItems, shippingAddress, paymentMethod } = req.body;

    if (orderItems.length === 0) {
      res.status(400);
      throw new Error("You don't have any products in your cart");
    }

    // create order instance
    const order = await Order.create({
      orderItems,
      shippingAddress,
      paymentMethod,
      user: req.user._id,
    });

    // overwrite cartitem image, price and name with db fields
    for (let item of order.orderItems) {
      const product = await Product.findById(item.id);

      item.image = product.image;
      item.price = product.price;
      item.name = product.name;
    }

    // 
    order.itemsPrice = Number(
      order.orderItems
        .reduce((acc, cur) => acc + cur.price * cur.qty, 0)
        .toFixed(2)
    );

    // if order price is less than $100 add $19.99 shipping
    order.shippingPrice = order.itemsPrice > 100 ? 0 : 19.99;
    // 13% tax (in ontario)
    order.taxPrice = Number((order.itemsPrice * 0.13).toFixed(2));
    // price after taxes and shipping
    order.totalPrice = order.itemsPrice + order.shippingPrice + order.taxPrice;

    await order.save();

    res.json(order._id);
});


export {
    addOrder
};