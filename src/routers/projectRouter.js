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
      return res.status(400).json({ error: '프로젝트명은 필수입니다.' });
    }
    if (content === null || content === undefined || content === '') {
      return res.status(400).json({ error: '프로젝트 내용은 필수입니다.' });
    }

    const newProject = await Project.create({
      userId,
      projectId: uuidv4(),
      title,
      content
    });

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
        return res.status(400).json({ error: '프로젝트명은 필수입니다.' });
      }
      if (content === null || content === undefined || content === '') {
        return res.status(400).json({ error: '프로젝트명 내용은 필수입니다.' });
      }

      const updatedProject = await Project.findByUserIdAndProjectIdAndUpdate({
        userId,
        projectId,
        toUpdate: { title, content }
      });

      if (updatedProject.userId !== userId._id) {
        return res.status(403).json({ error: '수정 권한이 없습니다.' });
      }

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

      if (project === null || project.userId !== userId._id) {
        return res.status(403).json({ error: '삭제 권한이 없습니다.' });
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
