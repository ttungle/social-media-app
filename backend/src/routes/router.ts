import express from 'express';
import userRoutes from './userRoutes';

const apiRoute = express();

apiRoute.use('/users', userRoutes);

export default apiRoute;