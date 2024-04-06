import jwt from 'jsonwebtoken';
import ErrorHandler from '../utils/ErrorHandler.js';

export const userToken = async (req, res, next) => {
  const token = req.cookies.user_token;

  if (!token) return next(new ErrorHandler('Unauthorized', 401));

  jwt.verify(token, process.env.JWT_USER_SECRET_KEY, (err, user) => {
    if (err) return next(new ErrorHandler(403, 'Forbidden'));

    req.user = user;
    next();
  });
};
export const shopToken = async (req, res, next) => {
  const token = req.cookies.shop_token;

  if (!token) return next(new ErrorHandler('Unauthorized', 401));

  jwt.verify(token, process.env.JWT_SHOP_SECRET_KEY, (err, shop) => {
    if (err) return next(new ErrorHandler(403, 'Forbidden'));

    req.shop = shop;
    next();
  });
};
