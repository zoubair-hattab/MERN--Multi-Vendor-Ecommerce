import CoupounCode from '../models/coupounCode.model.js';
import ErrorHandler from '../utils/ErrorHandler.js';

export const createCoupounCode = async (req, res, next) => {
  try {
    const isCoupounCodeExists = await CoupounCode.find({
      name: req.body.name,
    });

    if (isCoupounCodeExists.length !== 0) {
      return next(new ErrorHandler('Coupoun code already exists!', 400));
    }

    const coupounCode = await CoupounCode.create(req.body);
    res.status(201).json({
      success: true,
      message: coupounCode,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};
export const getAllCoupounsByShopId = async (req, res, next) => {
  try {
    const { coupounId } = req.params;
    const coupouns = await CoupounCode.find({
      shopId: coupounId,
    });
    if (!coupounId) {
      return next(
        new ErrorHandler('There is no coupoun inside this shop', 404)
      );
    }
    res.status(200).json({
      success: true,
      message: coupouns,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};
export const deleteCoupounCode = async (req, res, next) => {
  try {
    const { coupounId } = req.params;
    await CoupounCode.findByIdAndDelete(coupounId);
    res.status(200).json({
      success: true,
      message: 'Coupon code deleted successfully!',
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};
export const getCoupounCodeByName = async (req, res, next) => {
  try {
    const { name } = req.params;
    if (!name) {
      return next(new ErrorHandler('This Coupoun Code is not exisit.', 404));
    }
    const coupounCode = await CoupounCode.findOne({ name });
    if (!coupounCode) {
      return next(new ErrorHandler('This Coupoun Code is not exists.', 404));
    }
    res.status(200).json({
      success: true,
      message: coupounCode,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};
