import asyncHandler from 'express-async-handler';

import generateToken from '../utils/generateToken.js';
import User from '../models/User.js';

// Cookie Configuration
const cookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: 'Strict', // Strict | Lax | None
    maxAge: 24 * 60 * 60, // 1 day
};

// GET api/users/login
// Authenticate User and get token
// Public access
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // check if email is in user
    const user = await User.findOne({ email });

    // user with that email doesnt exist
    if(!user) {
        res.status(401);
        throw new Error('Invalid User Credentials');
    }

    // compare req.body and stored hash password
    const match = await user.matchPassword(password);

    if (!match) {
        res.status(401);
        throw new Error('Incorrect password');      
    }

    // gennerate token
    const token = generateToken(user._id);

    // set cookie
    res.cookie('Bearer', token, cookieOptions);

    // return user info
    return res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
    });

});

// POST /api/users/
// Register a new user
// Public Access
const registerUser = asyncHandler(async (req, res) => {
    const { email, password, name } = req.body;
  
    // check if email is in use
    const userExists = await User.findOne({ email });
  
    if (userExists) {
      res.status(400);
      throw new Error('User already exists');
    }
  
    // create a user object
    // create is basically syntactic sugar for the save method
    const user = await User.create({
      name,
      email,
      password, // hashed in user model
    });
  
    // generate token
    const token = generateToken(user._id);
  
    // set cookie
    res.cookie('Bearer', token, cookieOptions);
  
    // return user info
    return res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
});

// GET api/users/profile
// Get the users profile
// Private access
const getUserProfile = asyncHandler(async (req, res) => {
    // if there is no user
    // req.user comes from authMiddleware
    if (!req.user) {
        res.status(400);
        throw new Error('User not found');
      }
      // user is added to req object by authMiddleWare
      res.json({
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        isAdmin: req.user.isAdmin,
      });
});

export {
    authUser,
    registerUser,
    getUserProfile
};