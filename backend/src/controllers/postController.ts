import { catchAsync } from './../utils/catchAsync';
import { AppError } from './../utils/appError';
import Post from '../models/postModel';
import { filterObject } from '../utils';

export const createPost = catchAsync(async (req, res, next) => {
  const filteredBody = filterObject(req.body, 'description', 'images');
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
  const filteredBody = filterObject(req.body, 'description', 'images');

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
