import { NODE_ENV } from '../../config/index.js';

const errorHandler = (err, req, res, next) => {
  const statusCode =
    res.statusCode && res.statusCode != 200
      ? res.statusCode
      : err.statusCode
      ? err.statusCode
      : 500;
  const errorText = statusCode < 500 ? 'Client error' : 'Internal server error';
  const errorMessage = err.message || 'An unknown error occurred';

  // Log error
  console.error(`${errorText}: ${errorMessage}`);

  const response = {
    error: errorText,
    name: err.name,
    message: errorMessage,
  };

  if (NODE_ENV === 'development') {
    response.stack = err.stack;
  }

  res.status(statusCode).json({ success: false, response });
};

export default errorHandler;
