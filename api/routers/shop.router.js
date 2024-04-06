import express from 'express';
import { getInfo } from '../controllers/shop.controller.js';
const router = express();
router.get('/get-info/:shopId', getInfo);
export default router;
