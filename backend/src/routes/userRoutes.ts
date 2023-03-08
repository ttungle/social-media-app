import express from 'express';
import { getUser, updateUser, deleteUser, getMe, updateMe, deleteMe } from '../controllers/userController';
import { protect, restrictTo, updatePassword } from '../controllers/authController';

const router = express.Router();

router.use(protect);

router.get('/me', getMe, getUser);
router.patch('/updateMe', updateMe);
router.patch('/updateMyPassword', updatePassword);
router.delete('/deleteMe', deleteMe);

router.use(restrictTo('admin'));
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

export default router;
