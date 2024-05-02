const { Router } = require('express');
const { EducationService } = require('../services/educationService');

const educationRouter = Router();

educationRouter.post('/education/create', async function (req, res, next) {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        'headers의 Content-Type을 application/json으로 설정해주세요',
      );
    }

    const user_id = req.body.user_id;
    const school = req.body.school;
    const major = req.body.major;
    const status = req.body.status;

    const newEducation = await EducationService.addEducation({
      user_id,
      school,
      major,
      status,
    });

    res.status(201).json(newEducation);
  } catch (error) {
    next(error);
  }
});

educationRouter.get('/eduactions/:id', async function (req, res, next) {
  try {
    const educationId = req.params.id;
    const education = await EducationService.getEducation({ educationId });

    if (education.errorMessage) {
      throw new Error(education.errorMessage);
    }

    res.status(200).send(education);
  } catch (error) {
    next(error);
  }
});

educationRouter.put('/educations/:id', async function (req, res, next) {
  try {
    const educationId = req.params.id;

    const school = req.body.school ?? null;
    const major = req.body.major ?? null;
    const status = req.body.status ?? null;

    const toUpdate = { school, major, status };
    const education = await EducationService.setEducation({ educationId, toUpdate });

    if (education.errorMessage) {
      throw new Error(education.errorMessage);
    }

    res.status(200).send(education);
  } catch (error) {
    next(error);
  }
});

educationRouter.delete('/eduactions/:id', async function (req, res, next) {
  try {
    const educationId = req.params.id;
    const result = await EducationService.deleteEducation({ educationId });

    if (result.errorMessage) {
      throw new Error(result.errorMessage);
    }

    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
});

educationRouter.get('/educationlist/:user_id', async function (req, res, next) {
  try {
    const user_id = req.params.user_id;
    const educationList = await EducationService.getEducationList({ user_id });
    res.status(200).send(educationList);
  } catch (error) {
    next(error);
  }
});

module.exports =  {educationRouter};