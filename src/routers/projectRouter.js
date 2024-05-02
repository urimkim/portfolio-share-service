const is = require('@sindresorhus/is');
const { Router } = require('express');
const { login_required } = require('../middlewares/login_required');
const { ProjectService } = require('../services/projectService');

const projectRouter = Router();
projectRouter.use(login_required);

projectRouter.post('/project/create', async function (req, res, next) {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        'headers의 Content-Type을 application/json으로 설정해주세요',
      );
    }

    const user_id = req.body.user_id;
    const title = req.body.title;
    const content = req.body.content;

    const newProject = await ProjectService.addProject({
      user_id,
      title,
      content,
    });

    res.status(201).json(newProject);
  } catch (error) {
    next(error);
  }
});

projectRouter.get('/projects/:id', async function (req, res, next) {
  try {
    const projectId = req.params.id;

    const project = await ProjectService.getProject({ projectId });

    if (project.errorMessage) {
      throw new Error(project.errorMessage);
    }

    res.status(200).send(projcet);
  } catch (error) {
    next(error);
  }
});

projectRouter.put('/projects/:id', async function (req, res, next) {
  try {
    const projectId = req.params.id;

    const title = req.body.title ?? null;
    const content = req.body.content ?? null;

    const toUpdate = { title, content };

    const project = await ProjcetService.setProject({ projectId, toUpdate });

    if (project.errorMessage) {
      throw new Error(award.errorMessage);
    }

    res.status(200).send(project);
  } catch (error) {
    next(error);
  }
});

projectRouter.delete('/projects/:id', async function (req, res, next) {
  try {
    const projectId = req.params.id;

    const result = await ProjcetService.deleteProjcet({ projcetId });

    if (result.errorMessage) {
      throw new Error(result.errorMessage);
    }

    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
});

projectRouter.get('/projcetlist/:user_id', async function (req, res, next) {
  try {
    const user_id = req.params.user_id;
    const projcetList = await ProjcetService.getProjcetList({ user_id });
    res.status(200).send(projcetList);
  } catch (error) {
    next(error);
  }
});

module.exports =  projectRouter;