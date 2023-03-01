import { AppError } from './../utils/appError';
import User from '../models/userModel';
import { catchAsync } from '../utils';

// export const getMe = (req, res, next) => {};
// export const updateMe = (req, res, next) => {};
// export const deleteMe = (req, res, next) => {};

export const getUser = (req, res, next) => {
  res.status(200).json({
    status: 'success',
    data: {
      id: 1,
      name: 'Tung Le',
      email: 'ltt@gmail.com',
    },
  });
};

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
