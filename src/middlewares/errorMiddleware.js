const errorMiddleware = (error, req, res, next) => {
  const { name, message, statusCode } = error;
  if (statusCode >= 500 || statusCode === undefined || statusCode === null) {
    console.error(name, message);
    res.status(500).json({
      error: '서버에서 오류가 발생하였습니다. 잠시후에 다시 시도해주세요.',
      data: null
    });
    return;
  }
  res.status(statusCode).json({
    error: message,
    data: null
  });
};

module.exports = errorMiddleware;
