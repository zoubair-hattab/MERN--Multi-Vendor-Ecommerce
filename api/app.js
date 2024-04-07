import express from 'express';
import dotenv from 'dotenv';
import ErrorHandler from './middlewares/error.js';
import cookieParser from 'cookie-parser';
import authUserRouters from './routers/auth.user.router.js';

import userRouters from './routers/user.router.js';

import authShopRouters from './routers/auth.shop.router.js';
import shopRouters from './routers/shop.router.js';
import productRouters from './routers/product.router.js';
import eventRouters from './routers/event.router.js';
import couponRouters from './routers/coupon.router.js';

import cors from 'cors';
dotenv.config();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);
app.use('/', express.static('uploads'));

app.use(cookieParser());
app.use('/api/v2/auth/user', authUserRouters);
app.use('/api/v2/user', userRouters);
app.use('/api/v2/auth/shop', authShopRouters);
app.use('/api/v2/shop', shopRouters);
app.use('/api/v2/product', productRouters);
app.use('/api/v2/event', eventRouters);
app.use('/api/v2/coupon', couponRouters);

app.use(ErrorHandler);
export default app;
