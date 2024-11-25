const { Router } = require('express');
const { Education } = require('../db');
const authenticateUser = require('../middlewares/authenticateUser');

const educationRouter = Router();

educationRouter.post('/', authenticateUser, async function (req, res, next) {
  try {
    const { school, major, status } = req.body;
    const userId = res.locals.user;

    if (school === null || school === undefined || school === '') {
      return res.status(400).json({ error: '학교명은 필수입니다.' });
    }

    if (major === null || major === undefined || major === '') {
      return res.status(400).json({ error: '전공명은 필수입니다.' });
    }

    if (status === null || status === undefined || status === '') {
      return res.status(400).json({ error: '학력을 선택해주세요.' });
    }

    const newEducation = await Education.create({
      userId,
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

educationRouter.put('/:_id', authenticateUser, async function (req, res, next) {
  try {
    const educationId = req.params._id;
    const { school, major, status } = req.body;
    const userId = res.locals.user;

    if (school === null || school === undefined || school === '') {
      return res.status(400).json({ error: '학교명은 필수입니다.' });
    }

    if (major === null || major === undefined || major === '') {
      return res.status(400).json({ error: '전공명은 필수입니다.' });
    }

    if (status === null || status === undefined || status === '') {
      return res.status(400).json({ error: '학력을 선택해주세요.' });
    }

    const updatedEducation =
      await Education.findByUserIdAndEducationIdAndUpdate({
        userId,
        educationId,
        toUpdate: { school, major, status }
      });

    if (updatedEducation.userId !== userId._id) {
      return res.status(403).json({ error: '수정 권한이 없습니다.' });
    }

    res.json(updatedEducation);
  } catch (error) {
    next(error);
  }
});

educationRouter.delete(
  '/:_id',
  authenticateUser,
  async function (req, res, next) {
    try {
      const educationId = req.params._id;
      const userId = res.locals.user;

      const education = await Education.findByUserIdAndEducationIdAndDelete({
        userId,
        educationId
      });

      if (education === null || education.userId !== userId._id) {
        return res.status(403).json({ error: '삭제 권한이 없습니다.' });
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
