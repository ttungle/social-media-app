import express from 'express';
import { getUser } from '../controllers/userController';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Hey its user route');
});

router.get('/me', getUser);

export default router;
