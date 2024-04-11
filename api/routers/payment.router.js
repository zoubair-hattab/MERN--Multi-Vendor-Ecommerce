import express from 'express';
import { payment } from '../controllers/payment.controller.js';
import { userToken } from '../middlewares/verifyToken.js';
const router = express.Router();
router.post('/process', payment);
export default router;
