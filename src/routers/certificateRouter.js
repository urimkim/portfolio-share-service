const { Router } = require("express");
const { Certificate } = require("../db/index");
const { v4: uuidv4 } = require("uuid");

const certificateRouter = Router();

certificateRouter.post("/certificates", async function (req, res, next) {
  try {
    if (Object.keys(req.body).length === 0) {
      throw new Error("정보가 입력되지 않았습니다.");
    }
    const { userId, title, content } = req.body;

    const newCertificate = await Certificate.create({
      id: uuidv4(),
      userId,
      title,
      content,
    });
    console.log(newCertificate);
    res.status(201).json(newCertificate);
  } catch (error) {
    next(error);
  }
});

certificateRouter.get(
  "/certificateList/:userId",
  async function (req, res, next) {
    try {
      const userId = req.params.userId;
      const certificateList = await Certificate.findByUserId(userId);
      res.status(200).send(certificateList);
    } catch (error) {
      next(error);
    }
  }
);

certificateRouter.get("/certificates/:id", async function (req, res, next) {
  try {
    const certificateId = req.params.id;

    const certificate = await Certificate.findById(certificateId);

    if (certificate.errorMessage) {
      throw new Error(certificate.errorMessage);
    }

    res.status(200).send(certificate);
  } catch (error) {
    next(error);
  }
});

certificateRouter.put("/certificates/:id", async function (req, res, next) {
  try {
    const certificateId = req.params.id;

    const title = req.body.title;
    const content = req.body.content;

    const toUpdate = { title, content };

    let certificate = await Certificate.findById(certificateId);

    if (toUpdate.title) {
      const fieldToUpdate = "title";
      const newValue = toUpdate.title;
      certificate = await Certificate.update({
        certificateId,
        fieldToUpdate,
        newValue,
      });
    }

    if (toUpdate.content) {
      const fieldToUpdate = "content";
      const newValue = toUpdate.content;
      certificate = await Certificate.update({
        certificateId,
        fieldToUpdate,
        newValue,
      });
    }

    if (certificate.errorMessage) {
      throw new Error(certificate.errorMessage);
    }

    res.status(200).send(project);
  } catch (error) {
    next(error);
  }
});

module.exports = { certificateRouter };
