const { Router } = require('express');
const { Certificate } = require('../db');
const authenticateUser = require('../middlewares/authenticateUser');

const certificateRouter = Router();

certificateRouter.post('/', authenticateUser, async function (req, res, next) {
  try {
    const { _id } = res.locals.user;
    const { title, content } = req.body;

    if (title === null || title === undefined || title === '') {
      return res.status(400).json({ error: '자격증명은 필수입니다.' });
    }

    if (content === null || content === undefined || content === '') {
      return res.status(400).json({ error: '자격증 내용은 필수입니다.' });
    }

    const newCertificate = await Certificate.create({
      userId: _id,
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
    const { _id } = res.locals.user;
    const certificates = await Certificate.findByUserId(_id);

    res.json(certificates);
  } catch (error) {
    next(error);
  }
});

certificateRouter.put(
  '/:_id',
  authenticateUser,
  async function (req, res, next) {
    try {
      const certificateId = req.params._id;
      const { title, content } = req.body;
      const { _id } = res.locals.user;

      if (title === null || title === undefined || title === '') {
        return res.status(400).json({ error: '자격증명은 필수입니다.' });
      }

      if (content === null || content === undefined || content === '') {
        return res.status(400).json({ error: '자격증 내용은 필수입니다.' });
      }

      const updatedCertificate =
        await Certificate.findByUserIdAndCertificateIdAndUpdate(
          _id,
          certificateId,
          { title, content }
        );

      if (updatedCertificate.userId !== _id) {
        return res.status(403).json({ error: '수정 권한이 없습니다.' });
      }

      res.json(updatedCertificate);
    } catch (error) {
      next(error);
    }
  }
);

certificateRouter.delete(
  '/:_id',
  authenticateUser,
  async function (req, res, next) {
    try {
      const certificateId = req.params._id;
      const { _id } = res.locals.user;

      const certificate =
        await Certificate.findByUserIdAndCertificateIdAndDelete(
          _id,
          certificateId
        );

      if (certificate === null || certificate.userId !== _id) {
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
