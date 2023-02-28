const globalErrorHandler = (err, req, res, next) => {
  console.log(err);

  res.status(err.statusCode || 500).json({
    status: err.status || 'error',
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

export default globalErrorHandler;
