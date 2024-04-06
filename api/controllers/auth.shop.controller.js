import Shop from '../models/shop.model.js';
import ErrorHandler from '../utils/ErrorHandler.js';
import fs from 'fs';
import jwt from 'jsonwebtoken';
import sendMail from '../utils/sendMail.js';
import sendToken from '../utils/sendToken.js';
export const createShop = async (req, res, next) => {
  try {
    const {
      name,
      email,
      password,
      description,
      address,
      phoneNumber,
      zipCode,
    } = req.body;
    if (!name) {
      return next(new ErrorHandler('Enter your name.', 400));
    }
    if (!email) {
      return next(new ErrorHandler('Enter your email.', 400));
    }
    if (!password) {
      return next(new ErrorHandler('Enter your password.', 400));
    }

    const shopEmail = await Shop.findOne({ email });
    if (shopEmail) {
      const filePath = req.file.path;
      fs.unlink(filePath, (err) => {
        if (err) {
          return next(new ErrorHandler('Error deleting file', 500));
        }
      });

      return next(new ErrorHandler('Shop is aleardy exists.'));
    }
    const filename = req.file.filename;
    const shop = {
      name,
      email,
      password,
      description,
      address,
      phoneNumber,
      zipCode,
      avatar: filename,
    };
    const activationToken = createActiavtionToken(shop);
    const activationUrl = `http://localhost:5173/activation/shop/${activationToken}`;
    try {
      await sendMail({
        email: shop.email,
        subject: 'Activate your account',
        message: `Hello ${shop.name}, please click on the link to activate your account: ${activationUrl}`,
      });
      res.status(201).json({
        success: true,
        message: `please check your email:- ${shop.email} to activate your account!`,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};
export const activateAccount = async (req, res, next) => {
  try {
    const { token } = req.body;
    const newShop = jwt.verify(token, process.env.ACTIVATION_SHOP_KEY_TOKEN);
    const {
      name,
      email,
      password,
      description,
      address,
      phoneNumber,
      zipCode,
      avatar,
    } = newShop;
    const shopEmail = await Shop.findOne({ email });

    if (shopEmail) {
      return next(new ErrorHandler('Shop is already exist.', 400));
    }
    const shop = new Shop({
      name,
      email,
      password,
      description,
      address,
      phoneNumber,
      zipCode,
      avatar,
    });
    await shop.save();
    res.status(200).json({
      success: true,
      message: 'Create Your account suucffuly.',
    });
  } catch (error) {
    console.log(error.message);
    return next(new ErrorHandler(error.message, 500));
  }
};
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      return next(new ErrorHandler('Email is reaquired', 400));
    }
    if (!password) {
      return next(new ErrorHandler('password is reaquired', 400));
    }
    const shop = await Shop.findOne({ email }).select('+password');

    if (!shop) {
      return next(new ErrorHandler('This shop not exists.', 404));
    }
    const isPasswordValid = await shop.comparePassword(password);
    if (!isPasswordValid) {
      return next(new ErrorHandler('Provide a correct creadtial.'));
    }

    sendToken(res, 201, shop, 'shop_token');
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};
export const getShop = async (req, res, next) => {
  try {
    const shop = await Shop.findById(req.shop.id);
    if (!shop) {
      return next(new ErrorHandler('Shop is not exits', 404));
    }
    res.status(200).json({
      success: true,
      message: shop,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};
export const logout = async (req, res, next) => {
  try {
    res.clearCookie('shop_token');
    res.status(200).json({
      success: true,
      message: 'Shop has been logged out!',
    });
  } catch (error) {
    next(new ErrorHandler(error.message, 500));
  }
};
const createActiavtionToken = (shop) => {
  return jwt.sign(shop, process.env.ACTIVATION_SHOP_KEY_TOKEN, {
    expiresIn: '10m',
  });
};
