import Order from '../models/order.model.js';
import Product from '../models/product.model.js';
import Shop from '../models/shop.model.js';
import ErrorHandler from '../utils/ErrorHandler.js';
import fs from 'fs';
export const createProduct = async (req, res, next) => {
  try {
    const shopId = req.shop;
    console.log(shopId);
    const shop = await Shop.findById(shopId.id);

    if (!shop) {
      return next(
        new ErrorHandler('This Shop under this id is not exists', 404)
      );
    }
    console.log(req.body);
    const files = req.files;
    const imageUrls = files.map((file) => `${file.filename}`);
    const productData = req.body;
    productData.images = imageUrls;
    productData.shop = shop;

    const product = await Product.create(productData);

    res.status(201).json({
      success: true,
      message: 'Product is created',
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};
export const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      success: true,
      message: products,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};
export const getAllProductsByShopId = async (req, res, next) => {
  try {
    const { shopId } = req.params;
    const products = await Product.find({
      shopId,
    });
    if (!products) {
      return next(new ErrorHandler(error.message, 404));
    }
    res.status(200).json({
      success: true,
      message: products,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};
export const deleteProduct = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const productData = await Product.findById(productId);
    console.log(productData);
    productData.images.forEach((imageUrl) => {
      const filename = imageUrl;
      const filePath = `uploads/${filename}`;

      fs.unlink(filePath, (err) => {
        if (err) {
          console.log(err);
        }
      });
    });

    const product = await Product.findByIdAndDelete(productId);

    if (!product) {
      return next(new ErrorHandler('Product not found with this id!', 500));
    }

    res.status(201).json({
      success: true,
      message: 'Product Deleted successfully!',
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};
export const createReview = async (req, res, next) => {
  try {
    const user = req.user;
    const { rating, comment, productId, orderId } = req.body;
    console.log(req.body);
    const product = await Product.findById(productId);
    if (!product) {
      return next(new ErrorHandler('Product Not found .', 404));
    }
    const review = {
      user,
      rating,
      comment,
      productId,
    };
    const isReveiwed = product.reviews.find((item) => item.user._id == user.id);
    if (isReveiwed) {
      product.reviews.forEach((rev) => {
        if (rev.user._id === user.id) {
          (rev.rating = rating), (rev.comment = comment), (rev.user = user);
        }
      });
    } else {
      product.reviews.push(review);
    }
    let avg = 0;
    product.reviews.forEach((rev) => {
      avg += rev.rating;
    });

    product.ratings = avg / product.reviews.length;

    await product.save({ validateBeforeSave: false });

    await Order.findByIdAndUpdate(
      orderId,
      { $set: { 'cart.$[elem].isReviewed': true } },
      { arrayFilters: [{ 'elem._id': productId }], new: true }
    );

    res.status(200).json({
      success: true,
      message: 'Reviwed succesfully!',
    });
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler(error.message, 500));
  }
};
