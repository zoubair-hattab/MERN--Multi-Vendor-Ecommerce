import mongoose from 'mongoose';

const connectDB = () => {
  const connect = mongoose
    .connect(process.env.MONGO_URL)
    .then((connect) => {
      console.log(`dataBase is connect to host==>${connect.connection.host}`);
    })
    .catch((error) => {
      console.log(error.message);
    });
};
export default connectDB;
