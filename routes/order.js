import express from 'express';

import { addOrder, getOrderById, updateOrderToPaid, getMyOrders, getAllOrders } from '../controllers/orderController.js';

import protect from '../middleware/authMiddleware.js';
import isAdmin from '../middleware/adminMiddleware.js';
import validateOrder from '../middleware/validateOrder.js';
import checkObjectId from '../middleware/checkObjectId.js';

const router = express.Router();

router.route('/')
    .get(protect, isAdmin, getAllOrders)
    .post(protect, validateOrder, addOrder);

router.route('/myorders')
    .get(protect, getMyOrders);

router.route('/:id')
    .get(protect, checkObjectId('id'), getOrderById);

router.route('/:id/pay')
    .put(protect, checkObjectId('id'), updateOrderToPaid);

export default router;

