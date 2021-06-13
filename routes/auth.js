import express from 'express';
import passport from 'passport';
import session from 'express-session';

import generateToken from '../utils/generateToken.js';

const router = express.Router();

// Cookie Configuration
const cookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: 'Strict', // Strict | Lax | None
  maxAge: 24 * 60 * 60, // 1 day
};

// GET /google
// Auth with Google
// Public access
router.get(
  '/google',
  (req, res, next) => {
    req.session.redirectPath = req.query.redirect;
    next();
  },
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// GET /google/callback
// Google auth callback
// Public access
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    const redirect = req.session.redirectPath;
    res.redirect(`http://localhost:3000/login?redirect=${redirect}`);
  }
);

router.get('/currentuser', (req, res) => {
  const user = req.user;
  if (user) {

    // generate token
    const token = generateToken(user._id);

    // set cookie
    res.cookie('Bearer', token, cookieOptions);

    res.json({
      _id: user._id,
      googleId: user.googleId,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin
    });
  } else {
    res.send(null);
  }
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('http://localhost:3000');
});

export default router;
