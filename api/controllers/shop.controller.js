import Shop from '../models/shop.model.js';
import ErrorHandler from '../utils/ErrorHandler.js';

export const getInfo = async (req, res, next) => {
  try {
    const { shopId } = req.params;
    console.log(shopId);
    const shop = await Shop.findById(shopId);

    if (!shop) {
      return next(
        new ErrorHandler('This Shop under this id is not exists', 404)
      );
    }
    res.status(200).json({
      success: true,
      message: shop,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};
