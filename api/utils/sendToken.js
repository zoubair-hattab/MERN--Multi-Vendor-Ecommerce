import jwt from 'jsonwebtoken';

export default (res, statusCode, model, tokenName) => {
  const token = model.getJwtToken();
  // Options for cookies
  const options = {
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    Secure: true,
  };

  const { password: pass, ...rest } = model._doc;

  res.status(statusCode).cookie(tokenName, token, options).json({
    success: true,
    message: rest,
  });
};
