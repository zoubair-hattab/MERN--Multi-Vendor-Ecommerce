import ErrorHandler from '../utils/ErrorHandler.js';

export default (err, req, res, next) => {
  err.message = err.message || 'Internal Server Error';
  err.statusCode = err.statusCode || 500;

  //wrong mongodb id error
  if (err.name == 'CastError') {
    const message = `Resources not found with this id ...${error.path}`;
    err = new ErrorHandler(message, 400);
  }
  //Duplicate key
  if (err.code == 11000) {
    const message = `Duplicate key ${object.keys(err.keyValue)} Entred`;
    err = new ErrorHandler(message, 400);
  }
  //wrong jwt error
  if (err.name === 'JsonWebTokenError') {
    const message = `Your url is invalid please try again later`;
    err = new ErrorHandler(message, 400);
  }
  //token expire
  if (err.name === 'TokenExpiredError') {
    const message = 'Your url is expired please try later';
    err = new ErrorHandler(message, 400);
  }
  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
