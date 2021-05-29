import express from 'express';
import {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createReview,
  getTopRated,
  getBrands,
  getCategories
} from '../controllers/productController.js';

import protect from '../middleware/authMiddleware.js';
import isAdmin from '../middleware/adminMiddleware.js';
import checkObjectId from '../middleware/checkObjectId.js';
import validateReview from '../middleware/validateReview.js';
import validateProduct from '../middleware/validateProduct.js';

const router = express.Router();

router.route('/')
    .get(getProducts)
    .post(protect, isAdmin, createProduct);

router.route('/top')
    .get(getTopRated);

router.route('/brands')
    .get(getBrands);

router.route('/categories')
    .get(getCategories);

router.route('/:id/reviews')
  .post(protect, checkObjectId('id'), validateReview, createReview); 

router
  .route('/:id')
  .get(checkObjectId('id'), getProductById)
  .put(protect, isAdmin, checkObjectId('id'), validateProduct, updateProduct)
  .delete(protect, isAdmin, checkObjectId('id'), deleteProduct);

export default router;
