const { Router } = require('express');
const { Certificate } = require('../db/models/Certificate');
const { v4: uuidv4 } = require('uuid');
const authenticateUser = require('../middlewares/authenticateUser');

const certificateRouter = Router();

certificateRouter.post('/', authenticateUser, async function (req, res, next) {
  try {
    const { title, content } = req.body;
    const userId = res.locals.user;

    if (title === null || title === undefined || title === '') {
      const error = new Error('자격증명은 필수입니다.');
      error.name = 'Insufficient Certificate Info';
      error.statusCode = 400;
      throw error;
    }
    if (content === null || content === undefined || content === '') {
      const error = new Error('자격증 내용은 필수입니다.');
      error.name = 'Insufficient Certificate Info';
      error.statusCode = 400;
      throw error;
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
        const error = new Error('자격증명은 필수입니다.');
        error.name = 'Insufficient Award Info';
        error.statusCode = 400;
        throw error;
      }
      if (content === null || content === undefined || content === '') {
        const error = new Error('자격증 내용은 필수입니다.');
        error.name = 'Insufficient Award Info';
        error.statusCode = 400;
        throw error;
      }

      // TODO: DELETE랑 비슷하게 findByUserIdAndCertificateIdAndUpdate로 수정해보자
      // 그러면 DB에서 한번만 조회하게 됨
      const certificate = await Certificate.findById(certificateId);

      if (!certificate || certificate.userId !== userId) {
        return res.status(403).json({ message: '수정 권한이 없습니다.' });
      }

      const updatedCertificate = await Certificate.update({
        certificateId,
        toUpdate: { title, content }
      });

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

      if (certificate === null) {
        return res.status(403).json({ message: 'Forbidden' });
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
