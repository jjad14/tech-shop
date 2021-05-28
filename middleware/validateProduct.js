import { body, validationResult } from 'express-validator';

const validateProduct = [
  body('name', 'A Name is required').not().isEmpty(),
  body('price', 'A Price is required').isNumeric(),
  body('description', 'A Product Description is required').not().isEmpty(),
  body('image', 'An Image is required').not().isEmpty(),
  body('brand', 'A Brand is required').not().isEmpty(),
  body('category', 'A Category is required').not().isEmpty(),
  body('inventory', 'Inventory is required').isNumeric(),
  async (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      //return res.status(422).json({message: errors.array()});
      return res.status(422).json({message: errors.array().reduce((str, err) => `${str} ${err.msg},`, ' ')});
    }

    next();
  }
];

export default validateProduct;
