const { Router } = require("express");
const { Project } = require("../db");
const { v4: uuidv4 } = require("uuid");

const projectRouter = Router();

projectRouter.post("/projects", async function (req, res, next) {
  try {
    const { userId, title, content } = req.body;
    
    const newProject = await Project.create({
      id: uuidv4(),
      userId,
      title,
      content,
    });

    res.status(201).json(newProject);
  } catch (error) {
    next(error);
  }
});

projectRouter.get("/projects/:userId", async function (req, res, next) {
  try {
    const userId = req.params.userId;

    const projects = await Project.findByUserId({ userId });

    res.status(200).json(projects);
  } catch (error) {
    next(error);
  }
});

projectRouter.put("/projects/:userId", async function (req, res, next) {
  try {
    const userId = req.params.userId;

    const { title, content } = req.body;

    const toUpdate = {};
    if (title) toUpdate.title = title;
    if (content) toUpdate.content = content;

    const updatedProject = await Project.update({
      userId,
      toUpdate,
    });

    res.status(200).json(updatedProject);
  } catch (error) {
    next(error);
  }
});

projectRouter.delete("/projects/:userId", async function (req, res, next) {
  try {
    const userId = req.params.userId;
    const result = await Project.deleteById({ userId });
    
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = { projectRouter };
