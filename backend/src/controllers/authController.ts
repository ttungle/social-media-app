import User from '../models/userModel';
import { catchAsync } from '../utils';

export const register = catchAsync(async (req, res, next) => {
  const { username, email, password, passwordConfirm } = req.body;
  const newUser = await User.create({
    username,
    email,
    password,
    passwordConfirm,
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: newUser,
    },
  });
});
