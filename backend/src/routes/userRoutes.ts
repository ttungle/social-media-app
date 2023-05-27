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
  getSuggestionFriends,
} from '../controllers/userController';
import { protect, updatePassword } from '../controllers/authController';
import { restrictTo } from '../middlewares/authMiddleware';

const router = express.Router();

router.use(protect);

router.route('/me').get(getMe, getUser).patch(updateMe).delete(deleteMe);
router.patch('/updateMyPassword', updatePassword);

router.put('/:id/follow', followUser);
router.put('/:id/unfollow', unFollowUser);
router.get('/friends', getSuggestionFriends);
router.get('/friends/:userId', getFriendList);

router.use(restrictTo('admin'));
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

export default router;
