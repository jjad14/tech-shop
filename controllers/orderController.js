import asyncHandler from 'express-async-handler';

import Order from '../models/Order.js';

// GET api/orders
// Create Order
// Private access
const addOrder = asyncHandler(async (req, res) => {
    // @TODO: we only need only ids and quantity and we can calculate prices from here
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;

    // TODO: use express validator
    if (orderItems && orderItems.length === 0) {
        res.status(400);
        throw new Error('No order items');
    }
    else {
        // TODO: re-calculate prices using backend product.price 
        const order = new Order({
            orderItems,
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
        });

        const createdOrder = await order.save();

        res.status(201).json(createdOrder);
    }
});


export {
    addOrder
};