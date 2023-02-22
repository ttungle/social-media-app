import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import apiRoute from './src/routes/router';
import mongoose from 'mongoose';

dotenv.config();

const DB = process.env.DATABASE_URL?.replace('<PASSWORD>', process.env.DATABASE_PASSWORD as string);
mongoose.set('strictQuery', true);
mongoose.connect(DB as string).then(() => console.log('DB connect successful'));

const port = process.env.PORT || 8800;
const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = process.env.NODE_ENV === 'development';
const app = express();

app.use(helmet());

if (isDevelopment) app.use(morgan('dev'));
app.use(cors());
app.use(express.json({ limit: '10kb' }));

app.use('/api/v1', apiRoute);

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Hello LTT',
  });
});

app.get('*', (req, res) => {
  res.status(200).json({
    message: 'Error handler',
  });
});

app.listen(port, () => {
  console.log(`Server is listening on port: ${port}`);
});
