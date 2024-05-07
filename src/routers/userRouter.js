const express = require("express");
const controller = require("../controllers/controller");
const router = express.Router();

// 전체 사용자 목록 가져오기 및 페이지네이션
router.get("/users", controller.pagesOrAllUsers);

// 특정 사용자 조회해서 가져오기 라우터
router.get("/users/:userId", controller.user);

module.exports = router;
