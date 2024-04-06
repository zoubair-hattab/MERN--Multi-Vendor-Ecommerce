import express from 'express';
import { shopToken } from '../middlewares/verifyToken.js';
import upload from '../middlewares/multer.js';
import {
  createCoupounCode,
  deleteCoupounCode,
  getAllCoupounsByShopId,
} from '../controllers/coupounCode.controller.js';

const router = express.Router();
router.post('/create-coupoun', shopToken, createCoupounCode);
router.get('/get-all-coupoun-by-shop/:coupounId', getAllCoupounsByShopId);
router.delete('/delete/:coupounId', shopToken, deleteCoupounCode);

export default router;
