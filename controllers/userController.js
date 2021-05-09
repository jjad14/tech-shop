import asyncHandler from 'express-async-handler';

import generateToken from '../utils/generateToken.js';
import User from '../models/User.js';

// GET api/users/login
// Authenticate User and get token
// Public access
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // check if email is in user
    const user = await User.findOne({ email: email });

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        });
    }
    else {
        throw new Error('Invalid Credentials');
    }
});

export {
    authUser
};