import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';

import User from '../models/User.js';

const isAdmin = asyncHandler(async (req, res, next) => {
    // if there is no user
    if (!req.user || !req.user.isAdmin) {
      res.status(401);
      throw new Error('You Are Not Authorized');
    }

    next();
});

export default isAdmin;
