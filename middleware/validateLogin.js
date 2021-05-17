import { body, validationResult } from 'express-validator';

const validateLogin = [
  body('email', 'A valid email is required').isEmail(),
  body('password', 'A valid password with a min of 6 characters is required').isLength({min: 6}),
  (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      //return res.status(422).json({message: errors.array()});
      return res.status(422).json({message: errors.array().reduce((str, err) => `${str} ${err.msg},`, ' ')});
    }
    next();
  }
];

export default validateLogin;
