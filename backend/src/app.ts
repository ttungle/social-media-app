import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import globalErrorHandler from './controllers/errorController';
import apiRoute from './routes/router';

const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = process.env.NODE_ENV === 'development';
const publicPath = path.join(__dirname, process.env.FILE_SYSTEM_URL || '../public');

const app = express();

// Middleware
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  })
);
if (isDevelopment) app.use(morgan('dev'));
app.use(cors());
app.use(express.json({ limit: '10kb' }));
app.use(express.static(publicPath));

app.use('/api/v1', apiRoute);

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to homepage',
  });
});
app.get('*', (req, res) => {
  res.status(200).json({
    message: 'Error handler',
  });
});

app.use(globalErrorHandler);

export default app;
