import express from 'express';
import upload from '../middlewares/multer.js';
import {
  activateAccount,
  createShop,
  getShop,
  login,
  logout,
} from '../controllers/auth.shop.controller.js';
import { shopToken } from '../middlewares/verifyToken.js';
const router = express.Router();
router.post('/create-shop', upload.single('file'), createShop);
router.post('/activation', activateAccount);
router.post('/login', login);
router.get('/getshop', shopToken, getShop);
router.all('/logout', logout);

export default router;
