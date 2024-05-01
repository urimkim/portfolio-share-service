const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Members = require("../models/model");

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

    // json web token
    const token = jwt.sign({ _id: newMember._id }, "secretkey123", {
      expiresIn: "30d",
    });

    res
      .status(201)
      .json({ status: "success", message: "회원가입 성공", token });
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
    const token = jwt.sign({ _id: member._id }, "secretkey123", {
      expiresIn: "30d",
    });

    res.status(201).json({
      status: "success",
      message: "로그인 성공",
      token,
    });
  } catch (error) {
    next(error);
  }
};
