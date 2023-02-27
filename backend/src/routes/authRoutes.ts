import express from 'express';
import { getUser } from '../controllers/userController';
import { register } from '../controllers/authController';

const router = express.Router();

router.post('/register', register);

router.get('/me', getUser);

export default router;
