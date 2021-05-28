import { body, validationResult } from 'express-validator';

const validateUser = [
  body('name', 'A Name is required').not().isEmpty(),
  body('email', 'A valid email is required').isEmail(),
  body('password', 'A valid password with a min of 6 characters is required').isLength({min: 6}),
  async (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({message: errors.array().reduce((str, err) => `${str} ${err.msg},`, ' ')});
    }

    next();
  }
];

export default validateUser;
