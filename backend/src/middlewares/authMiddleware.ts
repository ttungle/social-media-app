import { AppError, catchAsync } from '../utils';

export const restrictTo = (...roles) =>
  catchAsync(async (req, res, next) => {
    if (!roles.includes(req?.user?.role)) next(new AppError('You do not have permission to perform this action.', 403));

    next();
  });

export const limitToCurrentUser = (req, res, next) => {
  if (req.method !== 'GET' && req.user.id !== req.body.author) next(new AppError('You can update only your post', 403));

  next();
};
