import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
const shopSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter your shop name!'],
    },
    email: {
      type: String,
      required: [true, 'Please enter your shop email address'],
    },
    password: {
      type: String,
      required: [true, 'Please enter your password'],
      minLength: [6, 'Password should be greater than 6 characters'],
      select: false,
    },
    description: {
      type: String,
    },
    address: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    role: {
      type: String,
      default: 'Seller',
    },
    avatar: {
      type: String,
      required: true,
    },
    zipCode: {
      type: Number,
      required: true,
    },

    resetPasswordToken: String,
    resetPasswordTime: Date,
  },
  { timestamps: true }
);

// Hash password
// Hash password
shopSchema.pre('save', function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = bcryptjs.hashSync(this.password, 10);
  next();
});

// jwt token
shopSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SHOP_SECRET_KEY, {
    expiresIn: process.env.JWT_SHOP_EXPIRES,
  });
};

// comapre password
shopSchema.methods.comparePassword = function (enteredPassword) {
  return bcryptjs.compareSync(enteredPassword, this.password);
};

const Shop = mongoose.model('Shop', shopSchema);
export default Shop;
