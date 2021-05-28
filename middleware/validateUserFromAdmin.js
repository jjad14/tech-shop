import { body, validationResult } from 'express-validator';

const validateUserFromAdmin = [
  body('name', 'A Name is required').not().isEmpty(),
  body('email', 'A valid email is required').isEmail(),
  body('isAdmin', '').isBoolean().default(false),
  async (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({message: errors.array().reduce((str, err) => `${str} ${err.msg},`, ' ')});
    }

    next();
  }
];

export default validateUserFromAdmin;
