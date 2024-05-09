const { Router } = require('express');
const { Certificate } = require('../db');
const { v4: uuidv4 } = require('uuid');
const authenticateUser = require('../middlewares/authenticateUser');

const certificateRouter = Router();

certificateRouter.post('/', authenticateUser, async function (req, res, next) {
  try {
    const { title, content } = req.body;
    const userId = res.locals.user;

    if (title === null || title === undefined || title === '') {
      return res.status(400).json({ error: '자격증명은 필수입니다.' });
    }

    if (content === null || content === undefined || content === '') {
      return res.status(400).json({ error: '자격증 내용은 필수입니다.' });
    }

    const newCertificate = await Certificate.create({
      userId,
      certificateId: uuidv4(),
      title,
      content
    });
    res.status(201).json(newCertificate);
  } catch (error) {
    next(error);
  }
});

certificateRouter.get('/', authenticateUser, async function (req, res, next) {
  try {
    const userId = res.locals.user;
    const certificates = await Certificate.findByUserId(userId);

    res.json(certificates);
  } catch (error) {
    next(error);
  }
});

certificateRouter.put(
  '/:certificateId',
  authenticateUser,
  async function (req, res, next) {
    try {
      const certificateId = req.params.certificateId;
      const { title, content } = req.body;
      const userId = res.locals.user;

      if (title === null || title === undefined || title === '') {
        return res.status(400).json({ error: '자격증명은 필수입니다.' });
      }

      if (content === null || content === undefined || content === '') {
        const error = new Error('자격증 내용은 필수입니다.');
      }

      if (content === null || content === undefined || content === '') {
        return res.status(400).json({ error: '자격증 내용은 필수입니다.' });
      }

      const updatedCertificate =
        await Certificate.findByUserIdAndCertificateIdAndUpdate({
          userId,
          certificateId,
          toUpdate: { title, content }
        });

      if (updatedCertificate.userId !== userId._id) {
        return res.status(403).json({ error: '수정 권한이 없습니다.' });
      }

      res.json(updatedCertificate);
    } catch (error) {
      next(error);
    }
  }
);

certificateRouter.delete(
  '/:certificateId',
  authenticateUser,
  async function (req, res, next) {
    try {
      const certificateId = req.params.certificateId;
      const userId = res.locals.user;

      const certificate =
        await Certificate.findByUserIdAndCertificateIdAndDelete({
          userId,
          certificateId
        });

      if (certificate === null || certificate.userId !== userId._id) {
        return res.status(403).json({ error: '삭제 권한이 없습니다.' });
      }

      res
        .status(204)
        .json({ message: '자격증 내역이 정상적으로 삭제되었습니다.' });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = certificateRouter;
