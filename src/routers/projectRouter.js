const { Router } = require("express");
const { Project } = require("../db/index");
const { v4: uuidv4 } = require("uuid");

const projectRouter = Router();

projectRouter.post("/projects", async function (req, res, next) {
  try {
    if (Object.keys(req.body).length === 0) {
      throw new Error("정보가 입력되지 않았습니다.");
    }
    const { userId, title, content } = req.body;

    const newProject = await Project.create({
      id: uuidv4(),
      userId,
      title,
      content,
    });
    console.log(newProject);
    res.status(201).json(newProject);
  } catch (error) {
    next(error);
  }
});

projectRouter.get("/projectList/:userId", async function (req, res, next) {
  try {
    const userId = req.params.userId;
    const projcetList = await Project.findByUserId(userId);
    res.status(200).send(projcetList);
  } catch (error) {
    next(error);
  }
});

projectRouter.get("/projects/:id", async function (req, res, next) {
  try {
    const projectId = req.params.id;

    const project = await Project.findById(projectId);

    if (project.errorMessage) {
      throw new Error(project.errorMessage);
    }

    res.status(200).send(projcet);
  } catch (error) {
    next(error);
  }
});

projectRouter.put("/projects/:id", async function (req, res, next) {
  try {
    const projectId = req.params.id;

    const title = req.body.title;
    const content = req.body.content;

    const toUpdate = { title, content };

    let project = await Project.findById(projectId);

    if (toUpdate.title) {
      const fieldToUpdate = "title";
      const newValue = toUpdate.title;
      project = await Project.update({ projectId, fieldToUpdate, newValue });
    }

    if (toUpdate.content) {
      const fieldToUpdate = "content";
      const newValue = toUpdate.content;
      project = await Project.update({ projectId, fieldToUpdate, newValue });
    }

    if (project.errorMessage) {
      throw new Error(project.errorMessage);
    }

    res.status(200).send(project);
  } catch (error) {
    next(error);
  }
});

module.exports = { projectRouter };
