const errorHandlerMiddleWare = (err, req, res, next) => {
  return res.status(err.statusCode ? err.statusCode : 500).json({
    success: false,
    err: err,
    status: err.status || "fail",
    message: err.message,
    statusCode: err.statusCode,
  });
};
module.exports = errorHandlerMiddleWare;
