import User from '../models/user.model.js';
import ErrorHandler from '../utils/ErrorHandler.js';
import fs from 'fs';

export const updateUserInfo = async (req, res, next) => {
  try {
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

export const updateUserAddress = async (req, res, next) => {
  try {
    const user = req.user;
    const userAddress = await User.findById(user.id);
    if (!userAddress) {
      return next(ErrorHandler('User not found', 404));
    }
    const isExisit = userAddress?.addresses.find(
      (item) => item.addressType == req.body.addressType
    );
    if (isExisit) {
      return next(new ErrorHandler('This Type is Exist', 401));
    }
    const upadateUser = await User.findByIdAndUpdate(
      user.id,
      {
        $push: {
          addresses: req.body,
        },
      },
      { new: true }
    );
    const { password, ...rest } = upadateUser._doc;
    res.status(201).json({
      success: true,
      message: rest,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};
export const deleteAddress = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(id);
    const user = req.user;
    const userAddress = await User.findById(user.id);
    if (!userAddress) {
      return next(new ErrorHandler('this user is not exisits', 400));
    }

    await User.findByIdAndUpdate(user.id, {
      $pull: { addresses: { _id: id } },
    });
    res.status(200).json({
      success: true,
      message: 'Deleted duccsufly.',
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};
