import Event from '../models/event.model.js';
import Shop from '../models/shop.model.js';
import ErrorHandler from '../utils/ErrorHandler.js';
import fs from 'fs';
export const createEvent = async (req, res, next) => {
  try {
    const shopId = req.shop;
    console.log(shopId);
    const shop = await Shop.findById(shopId.id);
    console.log(shop);

    if (!shop) {
      return next(
        new ErrorHandler('This Shop under this id is not exists', 404)
      );
    }
    const files = req.files;
    const imageUrls = files.map((file) => `${file.filename}`);
    const eventData = req.body;
    eventData.images = imageUrls;
    eventData.shop = shop;

    const event = await Event.create(eventData);

    res.status(201).json({
      success: true,
      message: 'Event is created',
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};
export const getAllEvents = async (req, res, next) => {
  try {
    const events = await Event.find();
    res.status(200).json({
      success: true,
      message: events,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};
export const getAllEventsByShopId = async (req, res, next) => {
  try {
    const { shopId } = req.params;
    const events = await Event.find({
      shopId,
    });
    if (!events) {
      return next(new ErrorHandler(error.message, 404));
    }
    res.status(200).json({
      success: true,
      message: events,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};
export const deleteEvent = async (req, res, next) => {
  try {
    const { eventId } = req.params;
    console.log(eventId);
    const eventData = await Event.findById(eventId);

    eventData.images.forEach((imageUrl) => {
      const filename = imageUrl;
      const filePath = `uploads/${filename}`;

      fs.unlink(filePath, (err) => {
        if (err) {
          console.log(err);
        }
      });
    });

    const event = await Event.findByIdAndDelete(eventId);

    if (!event) {
      return next(new ErrorHandler('Event not found with this id!', 500));
    }

    res.status(201).json({
      success: true,
      message: 'Event Deleted successfully!',
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};
