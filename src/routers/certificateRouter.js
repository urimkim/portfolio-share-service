const { Router } = require("express");
const { Certificate } = require("../db");
const { v4: uuidv4 } = require("uuid");
const { authenticateUser } = require("../middlewares/authenticateUser");

const certificateRouter = Router();

certificateRouter.post(
  "/",
  authenticateUser,
  async function (req, res, next) {
    try {
      const { title, content } = req.body;
      const userId = res.locals.user;

      if (title === null || title === undefined || title === "") {
        const error = new Error("자격증명은 필수입니다.");
        error.name = "Insufficient Certificate Info";
        error.statusCode = 400;
        throw error;
      }
      if (content === null || content === undefined || content === "") {
        const error = new Error("자격증 내용은 필수입니다.");
        error.name = "Insufficient Certificate Info";
        error.statusCode = 400;
        throw error;
      }

      const newCertificate = await Certificate.create({
        userId,
        certificateId: uuidv4(),
        title,
        content,
      });
      console.log(userId);
      res.status(201).json(newCertificate);
    } catch (error) {
      next(error);
    }
  }
);

certificateRouter.get(
  "/certificates",
  authenticateUser,
  async function (req, res, next) {
    try {
      const userId = res.locals.user;
      const certificates = await Certificate.findByUserId(userId);

      res.status(200).json(certificates);
    } catch (error) {
      next(error);
    }
  }
);

certificateRouter.put(
  "/certificates/:certificateId",
  authenticateUser,
  async function (req, res, next) {
    try {
      const certificateId = req.params.certificateId;
      const { title, content } = req.body;
      const userId = res.locals.user;

      const certificate = await Certificate.findById(certificateId);

      if (!certificate || certificate.userId !== userId) {
        return res.status(403).json({ message: "Forbidden" });
      }

      const updatedCertificate = await Certificate.update({
        certificateId,
        toUpdate: { title, content },
      });

      res.status(200).json(updatedCertificate);
    } catch (error) {
      next(error);
    }
  }
);

certificateRouter.delete(
  "/certificates/:certificateId",
  authenticateUser,
  async function (req, res, next) {
    try {
      const certificateId = req.params.certificateId;
      const userId = res.locals.user;

      const certificate = await Certificate.findById(certificateId);

      if (!certificate || certificate.userId !== userId) {
        return res.status(403).json({ message: "Forbidden" });
      }

      await Certificate.deleteById(certificateId);

      res.status(200).json({ message: "Certificate deleted successfully" });
    } catch (error) {
      next(error);
    }
  }
);

module.exports =  certificateRouter ;
