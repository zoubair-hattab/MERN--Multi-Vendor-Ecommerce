import express from 'express';
import upload from '../middlewares/multer.js';
import {
  activateAccount,
  createUser,
  getUser,
  login,
  logout,
} from '../controllers/auth.user.controller.js';
import { userToken } from '../middlewares/verifyToken.js';
const router = express.Router();
router.post('/create-user', upload.single('file'), createUser);
router.post('/activation/:token', activateAccount);
router.post('/login', login);
router.get('/getuser', userToken, getUser);
router.all('/logout', logout);

export default router;
