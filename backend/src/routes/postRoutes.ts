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
} from '../controllers/postController';
import { limitToCurrentUser } from '../middlewares/authMiddleware';

const router = express.Router();

router.use(protect);
router.route('/').post(createPost);
router.put('/:id/like', likePost);
router.get('/timeline', getTimeLine);
router.get('/myTimeline', getMyTimeLine);

router.use(limitToCurrentUser);
router.route('/:id').get(getPost).patch(updatePost).delete(deletePost);

export default router;
