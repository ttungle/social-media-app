import mongoose from 'mongoose';
import { uploadInit } from '../middlewares/fileMiddleware';
import Post from '../models/postModel';
import { calculateMetaData, filterObject } from '../utils';
import APIFeatures from '../utils/apiFeatures';
import { AppError } from './../utils/appError';
import { catchAsync } from './../utils/catchAsync';

const upload = uploadInit('./public/image/posts', 'post', 'image');
export const uploadPostPhotos = upload.array('images', 10);

export const createPost = catchAsync(async (req, res, next) => {
  const filteredBody: any = filterObject(req.body, 'description', 'images');

  if (req.files) filteredBody.images = req.files.map((file) => `/image/posts/${file.filename}`);
  const postData = {
    author: req?.user?.id,
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

  if (req.files.length > 0) filteredBody.images = req.files.map((file) => `/image/posts/${file.filename}`);

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

export const deleteMyPost = catchAsync(async (req, res, next) => {
  const currentPost: any = await Post.findById(req?.params?.id);

  if (req?.user?.id !== currentPost?.author.id) return next(new AppError('You can delete only your post.', 403));

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
  const postQuery = Post.find({ $or: [{ author: req.user.id }, { author: { $in: req.user.followings } }] });
  const apiFeature = new APIFeatures(postQuery, req.query).paginate();
  const posts = await apiFeature.query;
  const meta = calculateMetaData(req.query, posts.length);

  res.status(200).json({
    status: 'success',
    data: {
      posts,
    },
    meta,
  });
});

export const getMyTimeLine = catchAsync(async (req, res, next) => {
  const postQuery = Post.find({ author: req.user.id });
  const apiFeature = new APIFeatures(postQuery, req.query).paginate();
  const posts = await apiFeature.query;
  const totalPostCount = await Post.countDocuments({ author: req.user.id });
  const meta = calculateMetaData(req.query, totalPostCount);

  res.status(200).json({
    status: 'success',
    data: { posts },
    meta,
  });
});

export const getUserTimeline = catchAsync(async (req, res, next) => {
  const postQuery = Post.find({ author: req.params.userId });

  const apiFeature = new APIFeatures(postQuery, req.query).paginate();
  const posts = await apiFeature.query;
  const totalPostCount = await Post.countDocuments({ author: req.params.userId });
  const meta = calculateMetaData(req.query, totalPostCount);

  res.status(200).json({
    status: 'success',
    data: { posts },
    meta,
  });
});

export const getPostStats = catchAsync(async (req, res, next) => {
  const stats = await Post.aggregate([
    {
      $match: {
        author: new mongoose.Types.ObjectId(`${req.user.id}`),
        updatedAt: { $gte: new Date(req.params.year, 0, 1), $lte: new Date(req.params.year, 12, 32) },
      },
    },
    {
      $group: {
        _id: { month: { $month: '$updatedAt' }, year: { $year: '$updatedAt' } },
        postCount: { $sum: 1 },
        totalLikes: { $sum: { $size: '$likes' } },
        maxLikes: { $max: { $size: '$likes' } },
        minLikes: { $min: { $size: '$likes' } },
      },
    },
    {
      $addFields: {
        month: '$_id.month',
        year: '$_id.year',
      },
    },
    { $unset: ['_id'] },
  ]);

  res.status(200).json({
    status: 'success',
    data: { stats },
  });
});
