const jwt = require('jsonwebtoken');

function authenticateUser(req, res, next) {
    const Token = req.headers["authorization"]?.split(" ")[1] ?? "null";
   
    if (Token === "null") {
        console.log(
            "Authorization 토큰 없음",
        );
        res.status(400).send("로그인을 해주세요");
        return;
    }

    try {
        const userInfo = jsonwebtoken.verify(token, secret);
        res.locals.user = userInfo;
        next();
      }  catch (error) {
        res.status(400).json({ errorMessage: error.message }); 
        return;
    }
};

module.exports = {authenticateUser};
