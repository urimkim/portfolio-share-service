const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT; 

function authenticateUser(req, res, next) {
    const token = req.headers["authorization"]?.split(" ")[1] ?? "null";
   
    if (token === "null") {
        console.log("Authorization 토큰 없음");
        return res.status(400).send("로그인을 해주세요");
    }

    try {
        const jwtDecoded = jwt.verify(token, secretKey);
        res.locals.user = jwtDecoded.userId;
        next();
    } catch (error) {
        console.error("JWT 검증 오류:", error);
        return res.status(400).json({ errorMessage: "유효하지 않은 토큰" });
    }
}

module.exports = { authenticateUser };
