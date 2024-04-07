import express from 'express';
import { userToken } from '../middlewares/verifyToken.js';
import { updateUserInfo } from '../controllers/user.controller.js';
import upload from '../middlewares/multer.js';
const router = express.Router();
router.put(`/update`, userToken, upload.single('image'), updateUserInfo);
export default router;
