import express from 'express';
import {
  authUser,
  registerUser,
  getUserProfile,
  logout,
  updateUserProfile,
  getUsers,
} from '../controllers/userController.js';

import protect from '../middleware/authMiddleware.js';
import isAdmin from '../middleware/adminMiddleware.js';

import validateLogin from '../middleware/validateLogin.js';
import validateRegistration from '../middleware/validateRegistration.js';

const router = express.Router();

router.route('/')
  .post(validateRegistration, registerUser)
  .get(protect, isAdmin, getUsers);
router.post('/login', validateLogin, authUser );
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router.delete('/logout', logout);

export default router;
