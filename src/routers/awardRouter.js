const { Router } = require('express');
const { Award } = require('../db');
const { v4: uuidv4 } = require('uuid');
const { authenticateUser } = require('../middlewares/authenticateUser');

const awardRouter = Router();

awardRouter.post('/', authenticateUser, async function (req, res, next) {
  try {
    const { id: userId } = res.locals.user;
    const { title, content } = req.body;

    if (title === null || title === undefined || title === '') {
      const error = new Error('수상명은 필수입니다.');
      error.name = 'Insufficient Award Info';
      error.statusCode = 400;
      throw error;
    }
    if (content === null || content === undefined || content === '') {
      const error = new Error('수상 내용은 필수입니다.');
      error.name = 'Insufficient Award Info';
      error.statusCode = 400;
      throw error;
    }

    const newAward = await Award.create({
      userId,
      awardId: uuidv4(),
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
    const userId = res.locals.user;
    const awards = await Award.findByUserId(userId);

    res.status(200).json(awards);
  } catch (error) {
    next(error);
  }
});

awardRouter.put(
  '/:awardId',
  authenticateUser,
  authenticateUser,
  async function (req, res, next) {
    try {
      const awardId = req.params.awardId;
      const { title, content } = req.body;
      const userId = res.locals.user;

      const award = await Award.findById(awardId);

      if (!award || award.userId !== userId) {
        return res.status(403).json({ message: 'Forbidden' });
      }

      const updatedAward = await Award.update({
        awardId,
        toUpdate: { title, content }
      });

      res.status(200).json(updatedAward);
    } catch (error) {
      next(error);
    }
  }
);

awardRouter.delete(
  '/:awardId',
  authenticateUser,
  async function (req, res, next) {
    try {
      const awardId = req.params.awardId;
      const userId = res.locals.user;

      const award = await Award.findById(awardId);

      if (!award || award.userId !== userId) {
        return res.status(403).json({ message: 'Forbidden' });
      }

      await Award.deleteById(awardId);

      res.status(200).json({ message: 'Award deleted successfully' });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = awardRouter;
