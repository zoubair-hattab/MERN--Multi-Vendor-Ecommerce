import mongoose from 'mongoose';

const coupounCodeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter your coupoun code name!'],
      unique: true,
    },
    value: {
      type: Number,
      required: true,
    },
    minAmount: {
      type: Number,
    },
    maxAmount: {
      type: Number,
    },
    shopId: {
      type: String,
      required: true,
    },
    selectedProduct: {
      type: String,
    },
  },
  { timestamps: true }
);
const CoupounCode = mongoose.model('CoupounCode', coupounCodeSchema);
export default CoupounCode;