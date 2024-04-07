import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    phoneNumber: {
      type: Number,
    },
    address: {
      type: String,
    },
    role: {
      type: String,
      default: 'user',
    },
    avatar: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Hash password
userSchema.pre('save', function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = bcryptjs.hashSync(this.password, 10);
  next();
});

// jwt token
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_USER_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

// comapre password
userSchema.methods.comparePassword = function (enteredPassword) {
  return bcryptjs.compareSync(enteredPassword, this.password);
};
const User = mongoose.model('User', userSchema);
export default User;
