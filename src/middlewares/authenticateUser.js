const jwt = require('jsonwebtoken');
const config = require('../config');
const secretKey = config.jwt;

function authenticateUser(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1] ?? null;

  if (token === null) {
    return res.status(400).json({ errorMessage: '로그인을 해주세요' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ errorMessage: '만료된 토큰입니다' });
      }
      return res.status(401).json({ errorMessage: '유효하지 않은 토큰' });
    }
    res.locals.user = decoded;
    next();
  });
}

module.exports = { authenticateUser };
