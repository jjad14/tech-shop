import { body, validationResult } from 'express-validator';

const validateOrder = [
  body('shippingAddress', 'Shipping details is not defined').isObject().bail(),
  body('shippingAddress.*').notEmpty().isString().bail(),
  body('paymentMethod', 'Payment method is not defined').notEmpty().isString().bail(),
  body('orderItems', 'No items to order').isArray({min: 1}).bail(),
  body("orderItems.*.name").notEmpty().isString().bail(),  
  body("orderItems.*.image").notEmpty().isString().bail(), 
  body("orderItems.*.inventory").isNumeric().bail(), 
  body("orderItems.*.product").notEmpty().isString().bail(), 
  body("orderItems.*.price").isFloat().bail(), 
  body("orderItems.*.qty").isInt({ min:1}).bail(),
  (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      //return res.status(422).json({message: errors.array()});
      return res.status(422).json({message: 'Error: Make sure all fields are filled in and try again'});
    }
    next();
  }
];

/*
orderItems: Array of objects

object.name: String
object.image: String
object.inventory: Number
object.price: number
object.product: string
object.qty: number (greater than 1)

paymentMethod: String

shippingAddress: Object
shippingAddress.address: String
shippingAddress.city: String
shippingAddress.country: String
shippingAddress.phoneNumber: String
shippingAddress.postalCode: String
*/

export default validateOrder;
