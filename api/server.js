import app from './app.js';
import connectDB from './db/dataBase.js';
connectDB();
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port:==>${process.env.PORT}`);
});
