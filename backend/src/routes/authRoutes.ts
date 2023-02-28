import express from 'express';
import { getUser } from '../controllers/userController';
import { register, login } from '../controllers/authController';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

router.get('/me', getUser);

export default router;
