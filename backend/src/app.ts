import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import apiRoute from './routes/router';
import globalErrorHandler from './controllers/errorController';

const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = process.env.NODE_ENV === 'development';
const app = express();

app.use(helmet());

// Middleware
if (isDevelopment) app.use(morgan('dev'));
app.use(cors());
app.use(express.json({ limit: '10kb' }));
app.use(helmet());

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
