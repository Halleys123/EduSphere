const errorHandlerMiddleWare = (err, req, res, next) => {
  // console.log(err);

  return res.status(err.statusCode ? err.statusCode : 500).json({
    success: false,
    err: err,
    status: err.status || "fail",
    message: err.message,
    statusCode: err.statusCode,
    stack: err.stack,
  });
};
module.exports = errorHandlerMiddleWare;
