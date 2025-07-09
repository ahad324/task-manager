const errorHandler = (err, req, res, next) => {
  // Log the error stack for debugging
  console.error(err.stack);

  // Use existing status code or default to 500 if response was OK
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  // Send error response with message and stack trace (only in development)
  res.status(statusCode).json({
    message: err.message || 'Internal Server Error',
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });

  next(); // Call next middleware (if any)
};

export default errorHandler;
