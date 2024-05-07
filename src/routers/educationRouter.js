const { Router } = require('express');
const { Education } = require("../db/models/Education"); 
const { v4: uuidv4 } = require("uuid");
const { authenticateUser } = require('../middlewares/authenticateUser');

const educationRouter = Router();

educationRouter.post("/", authenticateUser, async function (req, res, next) {
  try {
    const { school, major, status } = req.body;
    const userId  = res.locals.user;
    const newEducation = await Education.create({
      userId,
      educationId: uuidv4(),
      school,
      major,
      status,
    });

    res.status(201).json(newEducation);
  } catch (error) {
    next(error);
  }
});

educationRouter.get('/', authenticateUser, async function (req, res, next) {
  try {
    const userId  = res.locals.user;
    const educations = await Education.findByUserId(userId);

    res.status(200).json(educations);
  } catch (error) {
    next(error);
  }
});

educationRouter.put('/:educationId', authenticateUser, async function (req, res, next) {
  try {
    const educationId = req.params.educationId;
    const { school, major, status } = req.body;
    const userId  = res.locals.user;

    const education = await Education.findById(educationId);

    if (!education || education.userId !== userId){
        return res.status(403).json({ message: "수정 권한이 없습니다." });
    }

    const updatedEducation = await Education.update({
      educationId,
      toUpdate: {school, major, status},
    });

    res.status(200).json(updatedEducation);
  } catch (error) {
    next(error);
  }
});

educationRouter.delete('/:educationId', authenticateUser, async function (req, res, next) {
  try {
    const educationId = req.params.educationId;
    const userId  = res.locals.user;

    const education = await Education.findById(educationId);

    if (!education || education.userId !== userId){
        return res.status(403).json({ message: "삭제 권한이 없습니다." });
    }

    await Education.deleteById(educationId);

    res.status(200).json( {message: "Education deleted successfully" });
  } catch (error) {
    next(error);
  }
});

module.exports =  educationRouter ;
