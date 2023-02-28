import * as jwt from 'jsonwebtoken';
import User from '../models/userModel';
import { catchAsync, AppError } from '../utils';

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
