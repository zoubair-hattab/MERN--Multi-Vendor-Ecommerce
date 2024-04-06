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
