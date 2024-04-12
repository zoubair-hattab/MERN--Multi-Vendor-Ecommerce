import express from 'express';
import {
  changeStatus,
  createOrder,
  getOrderByShop,
  getOrderByUser,
  refunded,
} from '../controllers/order.controller.js';
import { shopToken, userToken } from '../middlewares/verifyToken.js';
const router = express.Router();
router.post('/create-order', userToken, createOrder);
router.get('/get-all-orders-by-user', userToken, getOrderByUser);
router.get('/get-all-orders-by-shop', shopToken, getOrderByShop);
router.put('/update-order-status/:id', shopToken, changeStatus);
router.put('/order-refund/:id', shopToken, refunded);

export default router;
