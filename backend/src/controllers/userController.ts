import User from '../models/userModel';
import { calculateMetaData, catchAsync, filterObject, removeOldFiles } from '../utils';
import APIFeatures from '../utils/apiFeatures';
import { uploadInit } from './../middlewares/fileMiddleware';
import { AppError } from './../utils/appError';

const upload = uploadInit('./public/image/users', 'user', 'image');
export const uploadUserPictures = upload.fields([
  { name: 'profilePicture', maxCount: 1 },
  { name: 'coverPicture', maxCount: 1 },
]);

export const getMe = catchAsync(async (req, res, next) => {
  req.params.id = req.user.id;

  next();
});

export const updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm)
    return next(
      new AppError('This route is not for update password. Please use the /updateMyPassword route instead.', 400)
    );

  const filteredBody: any = filterObject(
    req.body,
    'username',
    'profilePicture',
    'coverPicture',
    'bio',
    'work',
    'city',
    'from',
    'relationship'
  );

  // Check and remove old files.
  [`user-profilePicture-${req.user.id}`, `user-coverPicture-${req.user.id}`].forEach((file) => {
    removeOldFiles('./public/image/users', file);
  });

  if (req.files.profilePicture) filteredBody.profilePicture = req.files.profilePicture?.[0]?.path.replace('public', '');
  if (req.files.coverPicture) filteredBody.coverPicture = req.files.coverPicture?.[0]?.path.replace('public', '');

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
  const filteredBody: any = filterObject(
    req.body,
    'username',
    'profilePicture',
    'coverPicture',
    'bio',
    'work',
    'city',
    'from',
    'relationship'
  );

  if (req.params.id) {
    // Check and remove old files.
    [`user-profilePicture-${req.params.id}`, `user-coverPicture-${req.params.id}`].forEach((file) => {
      removeOldFiles('./public/image/users', file);
    });
  }

  if (req.files.profilePicture) filteredBody.profilePicture = req.files.profilePicture?.[0]?.path.replace('public', '');
  if (req.files.coverPicture) filteredBody.coverPicture = req.files.coverPicture?.[0]?.path.replace('public', '');

  const user = await User.findByIdAndUpdate(req.params.id, filteredBody, {
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

export const getFriendList = catchAsync(async (req, res, next) => {
  const currentUser = await User.findById(req.params.userId);

  if (!currentUser) return next(new AppError('No user found with that id.', 404));

  const followingUsers = await Promise.all(currentUser?.followings.map((userId) => User.findById(userId)));

  const friends = followingUsers
    .filter((x) => x)
    .map((friend) => ({
      id: friend?.id,
      username: friend?.username,
      profilePicture: friend?.profilePicture,
    }));

  res.status(200).json({
    status: 'success',
    data: {
      friends,
    },
  });
});

export const getSuggestionFriends = catchAsync(async (req, res, next) => {
  const filter: { [key: string]: any } = {};
  filter.role = 'user';
  filter.followers = { $nin: req.user.id };

  const userQuery = User.find(filter);
  const apiFeature = new APIFeatures(userQuery, req.query).paginate();
  const userDoc = await apiFeature.query;
  const totalUserCount = await User.countDocuments(filter);
  const meta = calculateMetaData(req.query, totalUserCount);

  res.status(200).json({
    status: 'success',
    data: {
      users: userDoc,
    },
    meta,
  });
});
