import express from 'express';
import { getUser, updateUser, deleteUser } from '../controllers/userController';
import { protect, restrictTo } from '../controllers/authController';

const router = express.Router();

router.use(protect);

// router.get('/me');
// router.patch('/updateMe');
// router.patch('/updateMyPassword');
// router.delete('/deleteMe');

router.use(restrictTo('admin'));
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

export default router;
