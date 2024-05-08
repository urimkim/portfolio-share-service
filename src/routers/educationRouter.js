const { Router } = require('express');
const { Education } = require('../db');
const { v4: uuidv4 } = require('uuid');
const authenticateUser = require('../middlewares/authenticateUser');

const educationRouter = Router();

educationRouter.post('/', authenticateUser, async function (req, res, next) {
  try {
    const { school, major, status } = req.body;
    const userId = res.locals.user;

    if (school === null || school === undefined || school === '') {
      const error = new Error('학력명은 필수입니다.');
      error.name = 'Insufficient Education Info';
      error.statusCode = 400;
      throw error;
    }

    if (major === null || major === undefined || major === '') {
      const error = new Error('전공명은 필수입니다.');
      error.name = 'Insufficient Education Info';
      error.statusCode = 400;
      throw error;
    }

    if (status === null || status === undefined || status === '') {
      const error = new Error('학력을 선택해주세요.');
      error.name = 'Insufficient Education Info';
      error.statusCode = 400;
      throw error;
    }

    const newEducation = await Education.create({
      userId,
      educationId: uuidv4(),
      school,
      major,
      status
    });

    res.status(201).json(newEducation);
  } catch (error) {
    next(error);
  }
});

educationRouter.get('/', authenticateUser, async function (req, res, next) {
  try {
    const userId = res.locals.user;
    const educations = await Education.findByUserId(userId);

    res.json(educations);
  } catch (error) {
    next(error);
  }
});

educationRouter.put(
  '/:educationId',
  authenticateUser,
  async function (req, res, next) {
    try {
      const educationId = req.params.educationId;
      const { school, major, status } = req.body;
      const userId = res.locals.user;

      if (title === null || title === undefined || title === '') {
        const error = new Error('학력명은 필수입니다.');
        error.name = 'Insufficient Certificate Info';
        error.statusCode = 400;
        throw error;
      }
      if (content === null || content === undefined || content === '') {
        const error = new Error('학력 내용은 필수입니다.');
        error.name = 'Insufficient Certificate Info';
        error.statusCode = 400;
        throw error;
      }

      const education = await Education.findById(educationId);

      if (!education || education.userId !== userId) {
        return res.status(403).json({ message: '수정 권한이 없습니다.' });
      }

      const updatedEducation = await Education.update({
        educationId,
        toUpdate: { school, major, status }
      });

      res.json(updatedEducation);
    } catch (error) {
      next(error);
    }
  }
);

educationRouter.delete(
  '/:educationId',
  authenticateUser,
  async function (req, res, next) {
    try {
      const educationId = req.params.educationId;
      const userId = res.locals.user;

      const education = await Education.findByUserIdAndEducationIdAndDelete({
        userId,
        educationId
      });

      if (!education || education.userId !== userId) {
        return res.status(403).json({ message: '삭제 권한이 없습니다.' });
      }

      res
        .status(204)
        .json({ message: '학력 내역이 정상적으로 삭제되었습니다.' });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = educationRouter;
