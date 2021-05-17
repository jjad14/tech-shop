import { body, validationResult } from 'express-validator';

const validateUser = [
  body('email', 'A valid email is required').isEmail(),
  body('password', 'A valid password with a min of 6 characters is required').isLength({min: 6}),
  (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({message: JSON.stringify(errors.array())});
    next();
  }
];

export default validateUser;
