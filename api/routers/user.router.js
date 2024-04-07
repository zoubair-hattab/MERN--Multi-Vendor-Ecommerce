import express from 'express';
import { userToken } from '../middlewares/verifyToken.js';
import {
  updateUserInfo,
  updateUserAddress,
  deleteAddress,
} from '../controllers/user.controller.js';
import upload from '../middlewares/multer.js';
const router = express.Router();
router.put(`/update`, userToken, upload.single('image'), updateUserInfo);
router.patch(`/update-address`, userToken, updateUserAddress);
router.delete('/delete-address/:id', userToken, deleteAddress);
export default router;
