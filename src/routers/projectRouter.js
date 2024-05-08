const { Router } = require('express');
const { Project } = require('../db');
const { v4: uuidv4 } = require('uuid');
const authenticateUser = require('../middlewares/authenticateUser');

const projectRouter = Router();

projectRouter.post('/', authenticateUser, async function (req, res, next) {
  try {
    const { title, content } = req.body;
    const userId = res.locals.user;

    if (title === null || title === undefined || title === '') {
      const error = new Error('프로젝트명은 필수입니다.');
      error.name = 'Insufficient Project Info';
      error.statusCode = 400;
      throw error;
    }
    if (content === null || content === undefined || content === '') {
      const error = new Error('프로젝트 내용은 필수입니다.');
      error.name = 'Insufficient Project Info';
      error.statusCode = 400;
      throw error;
    }

    const newProject = await Project.create({
      userId,
      projectId: uuidv4(),
      title,
      content
    });
    console.log(userId);
    res.status(201).json(newProject);
  } catch (error) {
    next(error);
  }
});

projectRouter.get('/', authenticateUser, async function (req, res, next) {
  try {
    const userId = res.locals.user;
    const projects = await Project.findByUserId(userId);

    res.json(projects);
  } catch (error) {
    next(error);
  }
});

projectRouter.put(
  '/:projectId',
  authenticateUser,
  async function (req, res, next) {
    try {
      const projectId = req.params.projectId;
      const { title, content } = req.body;
      const userId = res.locals.user;

      if (title === null || title === undefined || title === '') {
        const error = new Error('프로젝트명은 필수입니다.');
        error.name = 'Insufficient Project Info';
        error.statusCode = 400;
        throw error;
      }
      if (content === null || content === undefined || content === '') {
        const error = new Error('프로젝트 내용은 필수입니다.');
        error.name = 'Insufficient Project Info';
        error.statusCode = 400;
        throw error;
      }

      const project = await Project.findById(projectId);

      if (!project || project.userId !== userId) {
        return res.status(403).json({ message: '수정 권한이 없습니다.' });
      }

      const updatedProject = await Project.update({
        projectId,
        toUpdate: { title, content }
      });

      res.json(updatedProject);
    } catch (error) {
      next(error);
    }
  }
);

projectRouter.delete(
  '/:projectId',
  authenticateUser,
  async function (req, res, next) {
    try {
      const projectId = req.params.projectId;
      const userId = res.locals.user;

      const project = await Project.findByUserIdAndProjectIdAndDelete({
        userId,
        projectId
      });

      if (!project || project.userId !== userId) {
        return res.status(403).json({ message: '삭제 권한이 없습니다.' });
      }

      res
        .status(204)
        .json({ message: '프로젝트 내역이 정상적으로 삭제되었습니다.' });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = projectRouter;
