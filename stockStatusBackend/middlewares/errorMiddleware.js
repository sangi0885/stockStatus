/**
 * Error handler middleware
 * errors thrown from async operations will also be caught
 */
const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode);

  res.json({
    message: err.message,
    // stack trace only in development
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
};

module.exports = errorHandler;
