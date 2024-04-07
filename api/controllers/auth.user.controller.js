import User from '../models/user.model.js';
import ErrorHandler from '../utils/ErrorHandler.js';
import fs from 'fs';
import jwt from 'jsonwebtoken';
import sendMail from '../utils/sendMail.js';
import sendToken from '../utils/sendToken.js';
export const createUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name) {
      return next(new ErrorHandler('Enter your name.', 400));
    }
    if (!email) {
      return next(new ErrorHandler('Enter your email.', 400));
    }
    if (!password) {
      return next(new ErrorHandler('Enter your password.', 400));
    }

    const userEmail = await User.findOne({ email });
    if (userEmail) {
      const filePath = req.file.path;
      fs.unlink(filePath, (err) => {
        if (err) {
          return next(new ErrorHandler('Error deleting file', 500));
        }
      });

      return next(new ErrorHandler('User is aleardy exists.'));
    }
    const filename = req.file.filename;
    const user = {
      name,
      email,
      password,
      avatar: filename,
    };
    const activationToken = createActiavtionToken(user);
    const activationUrl = `http://localhost:5173/activation/user/${activationToken}`;
    try {
      await sendMail({
        email: user.email,
        subject: 'Activate your account',
        message: `Hello ${user.name}, please click on the link to activate your account: ${activationUrl}`,
      });
      res.status(201).json({
        success: true,
        message: `please check your email:- ${user.email} to activate your account!`,
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
    const { token } = req.params;
    const newUser = jwt.verify(token, process.env.ACTIVATION_USER_KEY_TOKEN);
    const { email, name, password, avatar } = newUser;
    const userEmail = await User.findOne({ email });
    if (userEmail) {
      return next(new ErrorHandler('User is already exist.', 400));
    }
    const user = new User({
      email,
      name,
      password,
      avatar,
    });
    await user.save();
    res.status(200).json({
      success: true,
      message: 'Create Your account suucffuly.',
    });
  } catch (error) {
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
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return next(new ErrorHandler('This user not exists.', 404));
    }
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return next(new ErrorHandler('Provide a correct creadtial.'));
    }

    sendToken(res, 201, user, 'user_token');
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return next(new ErrorHandler('User is not exits', 404));
    }
    const { password, ...rest } = user._doc;

    res.status(200).json({
      success: true,
      message: rest,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};
export const logout = async (req, res, next) => {
  try {
    res.clearCookie('user_token');
    res.status(200).json({
      success: true,
      message: 'User has been logged out!',
    });
  } catch (error) {
    next(new ErrorHandler(error.message, 500));
  }
};
const createActiavtionToken = (user) => {
  return jwt.sign(user, process.env.ACTIVATION_USER_KEY_TOKEN, {
    expiresIn: '10m',
  });
};
