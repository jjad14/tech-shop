import express from 'express';
import {
  authUser,
  registerUser,
  getUserProfile,
  logout,
  updateUserProfile,
  getUsers,
  deleteUser,
} from '../controllers/userController.js';

import protect from '../middleware/authMiddleware.js';
import isAdmin from '../middleware/adminMiddleware.js';
import checkObjectId from '../middleware/checkObjectId.js';

import validateLogin from '../middleware/validateLogin.js';
import validateRegistration from '../middleware/validateRegistration.js';

const router = express.Router();

router
  .route('/')
  .post(validateRegistration, registerUser)
  .get(protect, isAdmin, getUsers);
router.post('/login', validateLogin, authUser);
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router.delete('/logout', logout);

router
  .route('/:id')
  .delete(protect, isAdmin, deleteUser);

export default router;
