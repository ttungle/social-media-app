import express from 'express';
import { protect, updatePassword } from '../controllers/authController';
import {
  deleteMe,
  deleteUser,
  followUser,
  getFriendList,
  getMe,
  getSuggestionFriends,
  getUser,
  unFollowUser,
  updateMe,
  updateUser,
  uploadUserPictures,
} from '../controllers/userController';
import { restrictTo } from '../middlewares/authMiddleware';

const router = express.Router();

router.use(protect);

router.route('/me').get(getMe, getUser).patch(uploadUserPictures, updateMe).delete(deleteMe);
router.patch('/updateMyPassword', updatePassword);
router.put('/:id/follow', followUser);
router.put('/:id/unfollow', unFollowUser);
router.get('/friends', getSuggestionFriends);
router.get('/friends/:userId', getFriendList);

router.use(restrictTo('admin'));
router.route('/:id').get(getUser).patch(uploadUserPictures, updateUser).delete(deleteUser);

export default router;
