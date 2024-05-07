const jwt = require("jsonwebtoken");

function authenticateUser(req, res, next) {
  const userToken = req.headers["authorization"]?.split(" ")[1] ?? "null";

  if (userToken === "null") {
    console.log("Authorization 토큰 없음");
    res.status(400).send("로그인한 유저만 사용할 수 있는 서비스입니다.");
    return;
  }

  try {
    const secretKey = process.env.JWT_SECRET_KEY || "secret-key";
    const jwtDecoded = jwt.verify(userToken, secretKey);
    res.locals.user = jwtDecoded.userId;

    next();
  } catch (error) {
    res.status(400).json({ errorMessage: error.message });
    return;
  }
}

module.exports = { authenticateUser };
