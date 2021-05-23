import express from 'express';
import {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
} from '../controllers/productController.js';

import protect from '../middleware/authMiddleware.js';
import isAdmin from '../middleware/adminMiddleware.js';
import checkObjectId from '../middleware/checkObjectId.js';

const router = express.Router();

router.route('/')
    .get(getProducts)
    .post(protect, isAdmin, createProduct);
router
  .route('/:id')
  .get(checkObjectId('id'), getProductById)
  .put(protect, isAdmin, checkObjectId('id'), updateProduct)
  .delete(protect, isAdmin, checkObjectId('id'), deleteProduct);

export default router;
