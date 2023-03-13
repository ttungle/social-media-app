import { AppError } from './../utils/appError';
import User from '../models/userModel';
import { catchAsync, filterObject } from '../utils';

export const getMe = catchAsync(async (req, res, next) => {
  req.params.id = req.user.id;

  next();
});

export const updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm)
    return next(
      new AppError('This route is not for update password. Please use the /updateMyPassword route instead.', 400)
    );

  const filteredBody = filterObject(
    req.body,
    'username',
    'profilePicture',
    'coverPicture',
    'followers',
    'followings',
    'description',
    'city',
    'from',
    'relationship',
    'active'
  );

  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  if (!updatedUser) return next(new AppError('No user found with that id.', 404));

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});

export const deleteMe = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.user.id, { active: false });

  if (!user) return next(new AppError('No user found with that id.', 404));

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

export const getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) return next(new AppError('No user found with that id', 404));

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

export const updateUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!user) return next(new AppError('No user found with that id', 404));

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

export const deleteUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) return next(new AppError('No user found with that id', 404));

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

export const followUser = catchAsync(async (req, res, next) => {
  if (req?.params?.id === req?.user?.id) return next(new AppError('You cannot follow your self.', 400));

  const user = await User.findById(req?.params?.id);
  const currentUser = await User.findById(req?.user?.id);

  if (!user) return next(new AppError('There are no user found with that id.', 404));
  if (!currentUser) return next(new AppError('You are not login. Please login to perform this action.', 401));
  if (user.followers.includes(currentUser.id)) return next(new AppError('You already have follow this user.', 403));

  await user.updateOne({ $push: { followers: currentUser.id } });
  await currentUser.updateOne({ $push: { followings: user.id } });

  res.status(200).json({
    status: 'success',
    data: {
      message: 'User has been followed.',
    },
  });
});

export const unFollowUser = catchAsync(async (req, res, next) => {
  if (req?.params?.id === req?.user?.id) return next(new AppError('You cannot unfollow your self.', 400));

  const user = await User.findById(req?.params?.id);
  const currentUser = await User.findById(req?.user?.id);

  if (!user) return next(new AppError('There are no user found with that id.', 404));
  if (!currentUser) return next(new AppError('You are not login. Please login to perform this action.', 401));
  if (!user.followers.includes(currentUser.id)) return next(new AppError('You already have unfollow this user.', 403));

  await user.updateOne({ $pull: { followers: currentUser.id } });
  await currentUser.updateOne({ $pull: { followings: user.id } });

  res.status(200).json({
    status: 'success',
    data: {
      message: 'User has been unfollowed.',
    },
  });
});
