class AppError extends Error {
  message: string;
  statusCode: number;
  status: string;
  isOperational: boolean;

  constructor(message, statusCode, isOperational = true) {
    super(message);

    this.message = message;
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = isOperational;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
