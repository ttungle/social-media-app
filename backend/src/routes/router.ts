import express from 'express';
import userRoutes from './userRoutes';
import authRoutes from './authRoutes';

const apiRoute = express();

apiRoute.use('/users', userRoutes);
apiRoute.use('/auth', authRoutes);

export default apiRoute;