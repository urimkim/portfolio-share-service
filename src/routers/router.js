const express = require("express");
const controller = require("../controllers/controller");
const router = express.Router();

// 회원가입 라우터
router.post("/signup", controller.signup);

// 로그인 라우터
router.post("/login", controller.login);

// 사용자 목록 가져오기 라우터
router.get("/users", controller.users);

// 특정 사용자 조회해서 가져오기 라우터
router.get("/users/:name", controller.user);

module.exports = router;
