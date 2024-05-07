const express = require("express");
const controller = require("../controllers/controller");
const router = express.Router();

// 회원가입 라우터
router.post("/signup", controller.signup);

// 로그인 라우터
router.post("/login", controller.login);

module.exports = router;
