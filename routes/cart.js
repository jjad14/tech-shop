import express from 'express';

import protect from '../middleware/authMiddleware.js';

const router = express.Router();

// TODO: add validation for order data
// router.route('/').post(protect, addOrder);

export default router;
