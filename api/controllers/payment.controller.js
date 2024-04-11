import ErrorHandler from '../utils/ErrorHandler.js';
import Stripe from 'stripe';
export const payment = async (req, res, next) => {
  try {
    const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY);

    const myPayment = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: 'USD',
      metadata: {
        company: 'E-SHOP',
      },
    });
    res.status(201).json({
      success: true,
      message: myPayment.client_secret,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};
