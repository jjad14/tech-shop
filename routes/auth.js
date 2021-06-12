import express from 'express';
import passport from 'passport';

const router = express.Router();

// GET /google
// Auth with Google
// Public access
router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

// GET /google/callback
// Google auth callback
// Public access
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.send('You are logged in');
  }
);

export default router;