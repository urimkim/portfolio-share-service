const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Members = require("../models/model");
const config = require("../config/index");

// 회원가입 컨트롤러 라우터로 보냄
exports.signup = async (req, res, next) => {
  try {
    const member = await Members.findOne({ email: req.body.email });

    if (member) {
      return res
        .status(400)
        .json({ status: "fail", message: "이미 등록된 사용자입니다" });
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 12);

    const newMember = await Members.create({
      ...req.body,
      password: hashedPassword,
    });

    res
      .status(201)
      .json({ status: "success", message: "회원가입 성공", });
  } catch (error) {
    next(error);
  }
};

// 로그인 컨트롤러 라우터로 보냄
exports.login = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const member = await Members.findOne({ name, email });

    if (!member) {
      return res
        .status(400)
        .json({ status: "fail", message: "사용자가 일치하지 않습니다" });
    }

    const isPassword = await bcrypt.compare(password, member.password);

    if (!isPassword) {
      return res
        .status(400)
        .json({ status: "fail", message: "비밀번호가 일치하지 않습니다" });
    }

    // json web token
    const token = jwt.sign({ _id: member._id }, config.jwt, {
      expiresIn: "1d",
    });

    res.status(200).json({
      status: "success",
      message: "로그인 성공",
      token,      
    });
  } catch (error) {
    next(error);
  }
};

// 사용자 목록 가져오기 컨트롤러 라우터로 보냄
exports.users = async (req, res, next) => {
  try {
    const members = await Members.find({});

    if (members === null || members === undefined) {
      return res
        .status(400)
        .json({ status: "null", error: "사용자가 없습니다" });
    }

    res.status(200).json(members);

  } catch (error) {
    next(error);
  }
};

// 특정 사용자 조회해서 가져오기 컨트롤러 라우터로 보냄
exports.user = async (req, res, next) => {
  try {
    const { name } = req.params;
    const user = await Members.findOne({ name });

    if (!user) {
      return res.status(400).json({ error: "해당 사용자가 없습니다"});
    }

    res.status(200).json({
      status: "success",
      message: "조회 성공",
      user, 
    });

  } catch (error) {
    next(error);
  }
};
