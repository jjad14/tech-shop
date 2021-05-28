import { body, validationResult } from 'express-validator';

const validateReview = [
  body('rating', 'A Name is required').isNumeric(),
  body('comment', 'A valid email is required').not().isEmpty(),
  async (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({message: errors.array().reduce((str, err) => `${str} ${err.msg},`, ' ')});
    }

    next();
  }
];

export default validateReview;
