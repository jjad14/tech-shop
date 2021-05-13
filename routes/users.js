import express from 'express';
import { authUser, registerUser, getUserProfile, logout } from '../controllers/userController.js';
import protect from '../middleware/authMiddleware.js'; 

const router = express.Router();

router.route('/').post(registerUser);
router.post('/login', authUser);
router.route('/profile').get(protect, getUserProfile);
router.delete('/logout', logout);

export default router;
