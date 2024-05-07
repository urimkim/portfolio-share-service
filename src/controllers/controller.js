const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Member = require('../db/models/Member');
const Award = require('../db/models/Award');
const Certificate = require('../db/models/Certificate');
const Education = require('../db/models/Education');
const Project = require('../db/models/Project');
const config = require('../config');

// 회원가입 컨트롤러 라우터로 보냄
const signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (name === null || name === undefined || name === '') {
      return res.status(400).json({ error: '이름 입력은 필수입니다' });
    }
    if (email === null || email === undefined || email === '') {
      return res.status(400).json({ error: '이메일 입력은 필수입니다' });
    }
    if (password === null || password === undefined || password === '') {
      return res.status(400).json({ error: '비밀번호 입력은 필수입니다' });
    }

    const member = await Member.findOne({ email: req.body.email }).lean();

    if (member) {
      return res.status(400).json({ error: '이미 등록된 사용자입니다' });
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 12);

    await Member.create({
      ...req.body,
      password: hashedPassword
    });

    res.status(201).json({ message: '회원가입 성공' });
  } catch (error) {
    next(error);
  }
};

// 로그인 컨트롤러 라우터로 보냄
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (email === null || email === undefined || email === '') {
      return res.status(400).json({ error: '이메일 입력은 필수입니다' });
    }
    if (password === null || password === undefined || password === '') {
      return res.status(400).json({ error: '비밀번호 입력은 필수입니다' });
    }

    const member = await Member.findOne({ email }).lean();

    if (!member) {
      return res
        .status(400)
        .json({ error: '이메일 또는 비밀번호가 일치하지 않습니다' });
    }

    const isPassword = await bcrypt.compare(password, member.password);

    if (!isPassword) {
      return res
        .status(400)
        .json({ error: '이메일 또는 비밀번호가 일치하지 않습니다' });
    }

    // json web token
    const token = jwt.sign({ _id: member._id }, config.jwt, {
      expiresIn: '1d'
    });

    res.status(200).json({
      token
    });
  } catch (error) {
    next(error);
  }
};

// 전체 사용자 목록 가져오기 및 페이지네이션
const pagesOrAllUsers = async (req, res, next) => {
  try {
    const allUsers = req.query.all === 'true';

    if (allUsers) {
      const members = await Member.find({}).lean();
      if (members.length === 0) {
        return res.status(400).json({ error: '사용자가 없습니다' });
      }
      return res.status(200).json({ members });
    }

    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    if (isNaN(page) || page < 1) {
      return res
        .status(400)
        .json({ error: '페이지 번호가 잘못 입력되었습니다' });
    }
    if (isNaN(limit) || limit < 1) {
      return res.status(400).json({ error: '값이 잘못 입력되었습니다' });
    }

    const skip = (page - 1) * limit;
    const users = await Member.find({}).skip(skip).limit(limit).lean();

    res.status(200).json({
      users
    });
  } catch (error) {
    next(error);
  }
};

// 특정 사용자 조회해서 가져오기 컨트롤러 라우터로 보냄
const user = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await Member.findById(userId).lean();

    if (!user) {
      return res.status(400).json({ error: '해당 사용자가 없습니다' });
    }

    const [awards, certificates, education, projects] = await Promise.all([
      Award.findByUserId(userId),
      Certificate.findByUserId(userId),
      Education.findByUserId(userId),
      Project.findByUserId(userId)
    ]);

    res.status(200).json({
      user,
      awards,
      certificates,
      education,
      projects
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signup,
  login,
  user,
  pagesOrAllUsers
};
