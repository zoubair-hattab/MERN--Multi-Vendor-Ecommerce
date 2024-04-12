import Order from '../models/order.model.js';
import ErrorHandler from '../utils/ErrorHandler.js';
import Product from '../models/product.model.js';

export const createOrder = async (req, res, next) => {
  try {
    const { cart, shippingAddress, user, totalPrice, paymentInfo } = req.body;
    //   group cart items by shopId
    const shopItemsMap = new Map();

    for (const item of cart) {
      const shopId = item.shopId;
      if (!shopItemsMap.has(shopId)) {
        shopItemsMap.set(shopId, []);
      }
      shopItemsMap.get(shopId).push(item);
    }

    // create an order for each shop
    const orders = [];

    for (const [shopId, items] of shopItemsMap) {
      const order = await Order.create({
        cart: items,
        shippingAddress,
        user,
        totalPrice,
        paymentInfo,
      });
      orders.push(order);
    }

    res.status(201).json({
      success: true,
      orders,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};
export const getOrderByUser = async (req, res, next) => {
  try {
    const user = req.user;
    const orders = await Order.find({ 'user._id': user.id }).sort({
      createdAt: -1,
    });
    if (!orders) {
      return next(new ErrorHandler('There is no Order rigth now .'));
    }
    res.status(200).json({
      success: true,
      message: orders,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};
export const getOrderByShop = async (req, res, next) => {
  try {
    const shop = req.shop;
    const orders = await Order.find({
      'cart.shopId': shop.id,
    }).sort({
      createdAt: -1,
    });
    if (!orders) {
      return next(new ErrorHandler('There is no Order rigth now .'));
    }
    res.status(200).json({
      success: true,
      message: orders,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};
export const changeStatus = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return next(new ErrorHandler('Order not found with this id', 400));
    }
    if (req.body.status === 'Transferred to delivery partner') {
      order.cart.forEach(async (o) => {
        await updateOrder(o._id, o.qty);
      });
    }

    order.status = req.body.status;

    if (req.body.status === 'Delivered') {
      order.deliveredAt = Date.now();
      order.paymentInfo.status = 'Succeeded';
    }

    await order.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true,
      message: order,
    });

    async function updateOrder(id, qty) {
      const product = await Product.findById(id);

      product.stock -= qty;
      product.sold_out += qty;

      await product.save({ validateBeforeSave: false });
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};
export const refunded = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return next(new ErrorHandler('Order not found with this id', 400));
    }

    order.status = req.body.status;

    await order.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true,
      message: order,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};
