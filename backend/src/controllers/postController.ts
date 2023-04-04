import multer from 'multer';
import Post from '../models/postModel';
import { filterObject } from '../utils';
import { AppError } from './../utils/appError';
import { catchAsync } from './../utils/catchAsync';

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/image/posts');
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];

    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, `post-${req.user.id}-${uniqueSuffix}.${ext}`);
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images.', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

export const uploadPostPhotos = upload.array('images', 10);

export const createPost = catchAsync(async (req, res, next) => {
  const filteredBody: any = filterObject(req.body, 'description', 'images');

  if (req.files) filteredBody.images = req.files.map((file) => `/image/posts/${file.filename}`);
  const postData = {
    userId: req?.user?.id,
    ...filteredBody,
  };

  const post = await Post.create(postData);

  res.status(200).json({
    status: 'success',
    data: {
      post,
    },
  });
});

export const getPost = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (!post) return next(new AppError('No post found with that id.', 404));

  res.status(200).json({
    status: 'success',
    data: {
      post,
    },
  });
});

export const updatePost = catchAsync(async (req, res, next) => {
  const filteredBody: any = filterObject(req.body, 'description', 'images');

  if (req.files) filteredBody.images = req.files.map((file) => `/image/posts/${file.filename}`);

  const updatedPost = await Post.findByIdAndUpdate(req.params.id, filteredBody, { new: true, runValidators: true });

  if (!updatedPost) return next(new AppError('No post found with that id.', 404));

  res.status(200).json({
    status: 'success',
    data: {
      post: updatedPost,
    },
  });
});

export const deletePost = catchAsync(async (req, res, next) => {
  const post = await Post.findByIdAndDelete(req?.params?.id);

  if (!post) return next(new AppError('No post found with that id.', 404));

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

export const likePost = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (!post) return next(new AppError('No post found with that id.', 404));

  if (!post.likes.includes(req.user.id)) {
    await post.updateOne({ $push: { likes: req.user.id } });
    return res.status(200).json({
      status: 'success',
      data: {
        message: 'The post has been liked.',
      },
    });
  }

  await post.updateOne({ $pull: { likes: req.user.id } });
  res.status(200).json({
    status: 'success',
    data: {
      message: 'The post has been disliked.',
    },
  });
});

export const getTimeLine = catchAsync(async (req, res, next) => {
  const currentUserPosts = await Post.find({ userId: req.user.id });
  const friendPosts = await Post.find({ userId: { $in: req.user.followings } });
  const posts = [...currentUserPosts, ...friendPosts];

  res.status(200).json({
    status: 'success',
    data: {
      posts,
    },
    total: posts.length,
  });
});

export const getMyTimeLine = catchAsync(async (req, res, next) => {
  const posts = await Post.find({ userId: req.user.id });

  res.status(200).json({
    status: 'success',
    data: {
      posts,
    },
    total: posts.length,
  });
});
