import express from 'express';

import { addOrder } from '../controllers/orderController.js';
import protect from '../middleware/authMiddleware.js';
import validateOrder from '../middleware/validateOrder.js';
import checkObjectId from '../middleware/checkObjectId.js';

const router = express.Router();

// TODO: add validation for order data
router.route('/').post(protect, validateOrder, addOrder);
router.route('/:id').get(checkObjectId('id'), protect, addOrder);

export default router;
