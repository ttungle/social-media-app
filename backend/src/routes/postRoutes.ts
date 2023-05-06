import express from 'express';
import { protect } from '../controllers/authController';
import {
  createPost,
  deletePost,
  getPost,
  updatePost,
  likePost,
  getTimeLine,
  getMyTimeLine,
  uploadPostPhotos,
  deleteMyPost,
  getUserTimeline
} from '../controllers/postController';
import { limitToCurrentUser } from '../middlewares/authMiddleware';

const router = express.Router();

router.use(protect);
router.route('/').post(uploadPostPhotos, createPost);
router.put('/:id/like', likePost);
router.get('/timeline', getTimeLine);
router.get('/myTimeline', getMyTimeLine);
router.get('/:userId/timeline', getUserTimeline);
router.delete('/deleteMyPost/:id', deleteMyPost);

router
  .route('/:id')
  .get(limitToCurrentUser, getPost)
  .patch(uploadPostPhotos, limitToCurrentUser, updatePost)
  .delete(deletePost);

export default router;
