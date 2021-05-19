import express from 'express';

import { addOrder, getOrderById, updateOrderToPaid, getMyOrders } from '../controllers/orderController.js';
import protect from '../middleware/authMiddleware.js';
import validateOrder from '../middleware/validateOrder.js';
import checkObjectId from '../middleware/checkObjectId.js';

const router = express.Router();

router.route('/').post(protect, validateOrder, addOrder);
router.route('/myorders').get(protect, getMyOrders);
router.route('/:id').get(checkObjectId('id'), protect, getOrderById);
router.route('/:id/pay').put(checkObjectId('id'), protect, updateOrderToPaid);

export default router;

