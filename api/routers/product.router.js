import express from 'express';
import { shopToken } from '../middlewares/verifyToken.js';
import upload from '../middlewares/multer.js';
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getAllProductsByShopId,
} from '../controllers/product.controller.js';
const router = express.Router();
router.post(
  '/create-product',
  shopToken,
  upload.array('images'),
  createProduct
);
router.get('/get-all-product', getAllProducts);
router.get('/get-all-product-by-shop/:shopId', getAllProductsByShopId);
router.delete('/delete/:productId', shopToken, deleteProduct);

export default router;
