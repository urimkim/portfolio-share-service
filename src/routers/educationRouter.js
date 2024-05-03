const { Router } = require('express');
const { Education } = require("../db/models/Education");
const { v4: uuidv4 } = require("uuid");

const educationRouter = Router();

educationRouter.post("/educations", async function (req, res, next) {
  try {
    const { userId, school, major, status } = req.body;

    const newEducation = await Education.create({
      id: uuidv4(), // 새로운 UUID 생성
      userId,
      school,
      major,
      status,
    });

    res.status(201).json(newEducation);
  } catch (error) {
    next(error);
  }
});

educationRouter.get('/educations/:userId', async function (req, res, next) {
  try {
    const userId = req.params.userId;
    
    const educations = await Education.findByUserId({ userId });

    res.status(200).json(educations);
  } catch (error) {
    next(error);
  }
});

educationRouter.put('/educations/:userId', async function (req, res, next) {
  try {
    const userId = req.params.userId;
    const { school, major, status } = req.body;

    const toUpdate = {};
    if (school) toUpdate.school = school;
    if (major) toUpdate.major = major;
    if (status) toUpdate.status = status;

    // 학력 업데이트
    const updatedEducation = await Education.update({
      userId,
      toUpdate,
    });

    // 업데이트된 학력을 응답으로 전송
    res.status(200).json(updatedEducation);
  } catch (error) {
    next(error);
  }
});

educationRouter.delete('/educations/:userId', async function (req, res, next) {
  try {
    const userId = req.params.userId;
    // 학력 삭제
    const result = await Education.deleteById({ userId });

    // 삭제 결과를 응답으로 전송
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});


module.exports =  { educationRouter };
