import express from 'express';
import {
  authUser,
  registerUser,
  getUserProfile,
  logout,
  updateUserProfile,
} from '../controllers/userController.js';
import protect from '../middleware/authMiddleware.js';
import validateUser from '../middleware/validateUser.js';
import validateRegistration from '../middleware/validateRegistration.js';

const router = express.Router();

router.route('/').post(validateRegistration, registerUser);
router.post('/login', validateUser, authUser );
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router.delete('/logout', logout);

export default router;
