import User from '../models/user.model.js';
import ErrorHandler from '../utils/ErrorHandler.js';
import fs from 'fs';

export const updateUserInfo = async (req, res, next) => {
  try {
    console.log(req.body);
    const user = req.user;
    const userInfo = await User.findById(user.id).select('+password');
    if (!userInfo) {
      return next(new ErrorHandler('User not found', 400));
    }
    const isMatch = userInfo.comparePassword(req.body.password);
    if (!isMatch) {
      return next(
        new ErrorHandler('Please provide the correct information', 400)
      );
    }

    if (req.body.image) {
      const existAvatarPath = `uploads/${userInfo.avatar}`;
      fs.unlinkSync(existAvatarPath);
    }
    const updatedUser = await User.findByIdAndUpdate(
      user.id,
      {
        $set: {
          name: req.body.name,
          email: req.body.email,
          phoneNumber: req.body.phoneNumber,
          avatar: req.file?.filename,
        },
      },
      { new: true }
    );

    const { password, ...rest } = updatedUser._doc;
    res.status(201).json({
      success: true,
      message: rest,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};
