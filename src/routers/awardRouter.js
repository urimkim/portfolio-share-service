const { Router } = require("express");
const { Award } = require("../db/index");
const { v4: uuidv4 } = require("uuid");

const awardRouter = Router();

awardRouter.post("/awards", async function (req, res, next) {
  try {
    if (Object.keys(req.body).length === 0) {
      throw new Error("정보가 입력되지 않았습니다.");
    }
    const { userId, title, content } = req.body;

    const newAward = await Award.create({
      id: uuidv4(),
      userId,
      title,
      content,
    });
    res.status(201).json(newAward);
  } catch (error) {
    next(error);
  }
});

awardRouter.get("/awardList/:userId", async function (req, res, next) {
  try {
    const userId = req.params.userId;
    const awardList = await Award.findByUserId(userId);
    res.status(200).send(awardList);
  } catch (error) {
    next(error);
  }
});

awardRouter.get("/awards/:id", async function (req, res, next) {
  try {
    const awardId = req.params.id;

    const award = await Award.findById(awardId);

    if (award.errorMessage) {
      throw new Error(award.errorMessage);
    }

    res.status(200).send(award);
  } catch (error) {
    next(error);
  }
});

awardRouter.put("/awards/:id", async function (req, res, next) {
  try {
    const awardId = req.params.id;

    const title = req.body.title;
    const content = req.body.content;

    const toUpdate = { title, content };

    let award = await Award.findById(awardId);

    if (toUpdate.title) {
      const fieldToUpdate = "title";
      const newValue = toUpdate.title;
      award = await Award.update({ awardId, fieldToUpdate, newValue });
    }

    if (toUpdate.content) {
      const fieldToUpdate = "content";
      const newValue = toUpdate.content;
      award = await Award.update({ awardId, fieldToUpdate, newValue });
    }

    if (award.errorMessage) {
      throw new Error(award.errorMessage);
    }

    res.status(200).send(award);
  } catch (error) {
    next(error);
  }
});

module.exports = { awardRouter };
