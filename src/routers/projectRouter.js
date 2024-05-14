const { Router } = require('express');
const { Project } = require('../db');
const authenticateUser = require('../middlewares/authenticateUser');

const projectRouter = Router();

projectRouter.post('/', authenticateUser, async function (req, res, next) {
  try {
    const { title, content } = req.body;
    const { _id } = res.locals.user;

    if (title === null || title === undefined || title === '') {
      return res.status(400).json({ error: '프로젝트명은 필수입니다.' });
    }
    if (content === null || content === undefined || content === '') {
      return res.status(400).json({ error: '프로젝트 내용은 필수입니다.' });
    }

    const newProject = await Project.create({
      userId: _id,
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
    const { _id } = res.locals.user;
    const projects = await Project.findByUserId(_id);

    res.json(projects);
  } catch (error) {
    next(error);
  }
});

projectRouter.put('/:_id', authenticateUser, async function (req, res, next) {
  try {
    const projectId = req.params._id;
    const { title, content } = req.body;
    const { _id } = res.locals.user;

    if (title === null || title === undefined || title === '') {
      return res.status(400).json({ error: '프로젝트명은 필수입니다.' });
    }
    if (content === null || content === undefined || content === '') {
      return res.status(400).json({ error: '프로젝트명 내용은 필수입니다.' });
    }

    const updatedProject = await Project.findByUserIdAndProjectIdAndUpdate(
      _id,
      projectId,
      { title, content }
    );

    if (updatedProject.userId !== _id) {
      return res.status(403).json({ error: '수정 권한이 없습니다.' });
    }

    res.json(updatedProject);
  } catch (error) {
    next(error);
  }
});

projectRouter.delete(
  '/:_id',
  authenticateUser,
  async function (req, res, next) {
    try {
      const projectId = req.params._id;
      const { _id } = res.locals.user;

      const project = await Project.findByUserIdAndProjectIdAndDelete(
        _id,
        projectId
      );

      if (project === null || project.userId !== _id) {
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
