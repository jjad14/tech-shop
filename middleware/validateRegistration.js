import { body, validationResult } from 'express-validator';

import User from '../models/User.js';

const validateRegistration = [
  body('name', 'A Name is required').not().isEmpty(),
  body('email', 'A valid email is required').isEmail(),
  body('password', 'A valid password with a min of 6 characters is required').isLength({min: 6}),
  async (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      //return res.status(422).json({message: errors.array()});
      return res.status(422).json({message: errors.array().reduce((str, err) => `${str} ${err.msg},`, ' ')});
    }

    const { email } = req.body;

    // check if email is in user
    const user = await User.findOne({ email });

    // user with that email doesnt exist
    if(user) {
      return res.status(400).json({message: 'User already exists'});
    }

    next();
  }
];

export default validateRegistration;
