import * as jwt from 'jsonwebtoken';
import User from '../models/userModel';
import { catchAsync, AppError } from '../utils';
import { promisify } from 'util';

const createToken = (id, email) =>
  jwt.sign({ id, email }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

export const register = catchAsync(async (req, res, next) => {
  const { username, email, password, passwordConfirm } = req.body;

  const newUser = await User.create({
    username,
    email,
    password,
    passwordConfirm,
  });

  const token = createToken(newUser.id, newUser.email);
  newUser.password = undefined;

  res.status(200).json({
    status: 'success',
    token,
    data: {
      user: newUser,
    },
  });
});

export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) return next(new AppError('Please provide email and password.', 400));

  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.checkPassword(password, user.password as string)))
    return next(new AppError('Incorrect email and password.', 400));

  const token = createToken(user.id, user.email);
  user.password = undefined;

  res.status(200).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
});

export const protect = catchAsync(async (req, res, next) => {
  let token = '';

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) return next(new AppError('You are not login. Please login to access.', 401));

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) return next(new AppError('User belonging to this token no longer exist.', 401));

  if (currentUser.passwordChangeAfter(decoded.iat))
    return next(new AppError('The user has recently changed password. Please login again.', 401));

  req.user = currentUser;

  next();
});

export const restrictTo = (...roles) =>
  catchAsync(async (req, res, next) => {
    if (!roles.includes(req?.user?.role)) next(new AppError('You do not have permission to perform this action.', 403));

    next();
  });
