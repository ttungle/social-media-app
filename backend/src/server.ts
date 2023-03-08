import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import app from './app';

dotenv.config();

const DB = process.env.DATABASE_URL?.replace('<PASSWORD>', process.env.DATABASE_PASSWORD as string);

mongoose.set('strictQuery', true);
mongoose
  .connect(DB as string)
  .then(() => console.log('DB connect successful'))
  .catch((error) => {
    console.log('MongoDB connection error by: ', error);
  });

const port = process.env.PORT || 8800;
app.listen(port, () => {
  console.log(`Server is listening on port: ${port}`);
});
