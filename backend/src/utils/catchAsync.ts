export const catchAsync = (fn) => (req, res, next) => {
  try {
    fn(req, res, next);
  } catch (error) {
    next(error);
  }
};
