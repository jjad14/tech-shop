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

    
    // orderItems.forEach(async (item) => {
    //     // get item by cartitem id
    //     let lookupItem = await Product.findById(item.product);
    
    //     // overwrite cartItem price with the one from db
    //     item.price = lookupItem.price;
    
    //     // calculate price with taxation
    //     taxPrice += (item.price * 0.13) * item.qty;
    //     totalPrice += (item.price + (item.price * 0.13)) * item.qty;    
    // });



    // orderItems.forEach((item) => {
    //     Product.findById(item.product, (err, prod) => {
    //         if (err) {
    //             res.status(500).send(err)
    //         } else {
    //             // overwrite cartItem price with the one from db
    //             item.price = prod.price;
            
    //             // calculate price with taxation
    //             taxPrice += (item.price * 0.13) * item.qty;
    //             totalPrice += (item.price + (item.price * 0.13)) * item.qty;  
    //         }
    //     });
  
    // });

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

        // determin total cost
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


export {
    addOrder
};