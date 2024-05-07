const errorMiddleware = (error, req, res, next) => {
  const { name, message, statusCode } = error;
  if (statusCode >= 500) {
    // 500 이상의 응답코드의 경우 에러의 내용을 client에게 노출하면 안된다(보안사고로 이어질 수 있음). 왜? 500은 백엔드 개발자가 봐야할 에러이지 client가 신경 쓸 에러가 아니기 때문. 500 이하 400 이상의 응답코드만 응답으로 보내주자.
    console.error(name, message);
    res.status(statusCode).json({
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
