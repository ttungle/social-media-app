import express from 'express';
import { getUser } from '../controllers/userController';

const router = express.Router();

router.get('/me', getUser);

export default router;
