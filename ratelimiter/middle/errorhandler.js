const errorHandler = (err, req, res, next) => {
  console.error("errorrrrrrr",err.stack);

  let statusCode = 500;
  let message = "Something went wrong!";

  res.status(statusCode).json({
    success: false,
    error: message,
  });
};

module.exports = errorHandler;
