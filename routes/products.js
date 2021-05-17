import express from 'express';
import { getProducts, getProductById} from '../controllers/productController.js';
import checkObjectId from '../middleware/checkObjectId.js';

const router = express.Router();

router.route('/').get(getProducts);
// @TODO: ObjectId validation
router.route('/:id').get(checkObjectId('id'), getProductById);


export default router;
