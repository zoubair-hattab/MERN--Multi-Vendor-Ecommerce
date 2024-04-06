import express from 'express';
import { shopToken } from '../middlewares/verifyToken.js';
import upload from '../middlewares/multer.js';
import {
  createEvent,
  deleteEvent,
  getAllEvents,
  getAllEventsByShopId,
} from '../controllers/event.controller.js';
const router = express.Router();
router.post('/create-event', shopToken, upload.array('images'), createEvent);
router.get('/get-all-event', getAllEvents);
router.get('/get-all-event-by-shop/:shopId', getAllEventsByShopId);
router.delete('/delete/:eventId', shopToken, deleteEvent);

export default router;
