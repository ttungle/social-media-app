import express from 'express';
import {
  getUser,
  updateUser,
  deleteUser,
  getMe,
  updateMe,
  deleteMe,
  followUser,
  unFollowUser,
  getFriendList,
  getSuggestionFriends
} from '../controllers/userController';
import { protect, updatePassword } from '../controllers/authController';
import { restrictTo } from '../middlewares/authMiddleware';

const router = express.Router();

router.use(protect);

router.get('/me', getMe, getUser);
router.patch('/updateMe', updateMe);
router.patch('/updateMyPassword', updatePassword);
router.delete('/deleteMe', deleteMe);

router.put('/:id/follow', followUser);
router.put('/:id/unfollow', unFollowUser);
router.get('/friends', getSuggestionFriends);
router.get('/friends/:userId', getFriendList);

router.use(restrictTo('admin'));
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

export default router;
