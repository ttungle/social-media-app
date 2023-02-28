export class AppError extends Error {
  public readonly message: string;
  public readonly statusCode: number;
  private status: string;
  public readonly isOperational: boolean;

  constructor(message, statusCode, isOperational = true) {
    super(message);

    this.message = message;
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = isOperational;

    Error.captureStackTrace(this, this.constructor);
  }
}
