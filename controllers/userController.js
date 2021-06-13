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
        throw new Error('Invalid User Credentials');      
    }

    // generate token
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
  
    // create a user object
    // create is basically syntactic sugar for the save method
    const user = await User.create({
      name,
      email,
      password // hashed in user model
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
  // user is added to req object by authMiddleWare
  res.json({
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    isAdmin: req.user.isAdmin,
  });
}); 

// GET api/users/profile
// Update the users profile
// Private access
const updateUserProfile = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  if (name) req.user.name = name
  if (email) req.user.email = email
  if (password) req.user.password = password

  await req.user.save()

  res.json({
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    isAdmin: req.user.isAdmin,
  })
});

const logout = (req, res) => {
  // expire cookie and send back, which will be removed
  res.cookie("Bearer", "", {
    httpOnly: true,
    expires: new Date(0),
    secure: true,
    sameSite: "none",
  })
  .status(204)
  .send();
  
};

// GET api/users
// Get all users
// Private access (Admin)
const getUsers = asyncHandler(async (req, res) => {
  // Pagination Config
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;
  
  // @TODO: might need to switch to estimatedDocumentCount
  const count = await User.countDocuments();

  const users = await User.find({})
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({users, page, pages: Math.ceil(count / pageSize)});
}); 

// GET api/users/:id
// Get User By Id
// Private access (Admin)
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');

  if (!user) {
    res.status(404);
    throw new Error('User Not Found');
  }

  res.json(user);
}); 

// Put api/users/:id
// Update a users profile
// Private access (Admin)
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error('User Not Found');
  }

  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;
  user.isAdmin = Boolean(req.body.isAdmin);
  // user.isAdmin = req.body.isAdmin === undefined ? user.isAdmin : req.body.isAdmin

  console.log(user);

  const updatedUser = await user.save();

  res.json({
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    isAdmin: updatedUser.isAdmin,
  })
});

// DELETE api/users/:id
// Delete User By Id
// Private access (Admin)
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error('User Not Found');
  }

  await user.remove();

  res.status(204).send();
}); 

export {
    authUser,
    registerUser,
    getUserProfile,
    updateUserProfile,
    logout,
    getUsers,
    getUserById,
    updateUser,
    deleteUser
};