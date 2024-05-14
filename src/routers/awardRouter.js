const { Router } = require('express');
const { Award } = require('../db');
const authenticateUser = require('../middlewares/authenticateUser');

const awardRouter = Router();

awardRouter.post('/', authenticateUser, async function (req, res, next) {
  try {
    const { _id } = res.locals.user;
    const { title, content } = req.body;

    if (title === null || title === undefined || title === '') {
      return res.status(400).json({ error: '수상명은 필수입니다.' });
    }

    if (content === null || content === undefined || content === '') {
      return res.status(400).json({ error: '수상 내용은 필수입니다.' });
    }

    const newAward = await Award.create({
      userId: _id,
      title,
      content
    });
    res.status(201).json(newAward);
  } catch (error) {
    next(error);
  }
});

awardRouter.get('/', authenticateUser, async function (req, res, next) {
  try {
    const { _id } = res.locals.user;
    const awards = await Award.findByUserId(_id);

    res.json(awards);
  } catch (error) {
    next(error);
  }
});

awardRouter.put('/:_id', authenticateUser, async function (req, res, next) {
  try {
    const awardId = req.params._id;
    const { title, content } = req.body;
    const { _id } = res.locals.user;

    if (title === null || title === undefined || title === '') {
      return res.status(400).json({ error: '수상명은 필수입니다.' });
    }

    if (content === null || content === undefined || content === '') {
      return res.status(400).json({ error: '수상 내용은 필수입니다.' });
    }

    const updatedAward = await Award.findByUserIdAndAwardIdAndUpdate(
      _id,
      awardId,
      { title, content }
    );

    if (updatedAward.userId !== _id) {
      return res.status(403).json({ error: '수정 권한이 없습니다.' });
    }

    res.json(updatedAward);
  } catch (error) {
    next(error);
  }
});

awardRouter.delete('/:_id', authenticateUser, async function (req, res, next) {
  try {
    const awardId = req.params._id;
    const { _id } = res.locals.user;

    const award = await Award.findByUserIdAndAwardIdAndDelete(
      _id,
      awardId
    );

    if (award === null || award.userId !== _id) {
      return res.status(403).json({ error: '삭제 권한이 없습니다.' });
    }

    res.status(204).json({ message: '수상 내역이 정상적으로 삭제되었습니다.' });
  } catch (error) {
    next(error);
  }
});

module.exports = awardRouter;
