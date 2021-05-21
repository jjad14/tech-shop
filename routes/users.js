import express from 'express';
import {
  authUser,
  registerUser,
  getUserProfile,
  logout,
  updateUserProfile,
  getUsers,
  getUserById,
  updateUser,
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

router.delete('/logout', logout);

router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile); //@TODO: Needs body validation


router
  .route('/:id')
  .delete(protect, isAdmin, checkObjectId('id'), deleteUser)
  .get(protect, isAdmin, checkObjectId('id'), getUserById)
  .put(protect, isAdmin, checkObjectId('id'), updateUser); //@TODO: Needs body validation

export default router;
