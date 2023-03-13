import express from 'express';
import userRoutes from './userRoutes';
import authRoutes from './authRoutes';
import postRoutes from './postRoutes';

const apiRoute = express();

apiRoute.use('/users', userRoutes);
apiRoute.use('/auth', authRoutes);
apiRoute.use('/posts', postRoutes);

export default apiRoute;