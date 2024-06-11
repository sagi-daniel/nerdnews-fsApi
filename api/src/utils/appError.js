const logger = require('./logger');

class AppError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    // Log the error
    logger.error(`Status: ${this.status}, Message: ${this.message}`);

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
