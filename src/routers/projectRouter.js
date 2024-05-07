const { Router } = require("express");
const { Project } = require("../db");
const { v4: uuidv4 } = require("uuid");
const { authenticateUser } = require("../middlewares/authenticateUser");

const projectRouter = Router();

projectRouter.post(
  "/projects",
  authenticateUser,
  async function (req, res, next) {
    try {
      const { title, content } = req.body;
      const userId = res.locals.user;

      if (title === null || title === undefined || title === "") {
        const error = new Error("프로젝트명은 필수입니다.");
        error.name = "Insufficient Project Info";
        error.statusCode = 400;
        throw error;
      }
      if (content === null || content === undefined || content === "") {
        const error = new Error("프로젝트 내용은 필수입니다.");
        error.name = "Insufficient Project Info";
        error.statusCode = 400;
        throw error;
      }

      const newProject = await Project.create({
        userId,
        projectId: uuidv4(),
        title,
        content,
      });
      console.log(userId);
      res.status(201).json(newProject);
    } catch (error) {
      next(error);
    }
  }
);

projectRouter.get(
  "/projects",
  authenticateUser,
  async function (req, res, next) {
    try {
      const userId = res.locals.user;
      const projects = await Project.findByUserId(userId);

      res.status(200).json(projects);
    } catch (error) {
      next(error);
    }
  }
);

projectRouter.put(
  "/projects/:projectId",
  authenticateUser,
  async function (req, res, next) {
    try {
      const projectId = req.params.projectId;
      const { title, content } = req.body;
      const userId = res.locals.user;

      const project = await Project.findById(projectId);

      if (!project || project.userId !== userId) {
        return res.status(403).json({ message: "Forbidden" });
      }

      const updatedProject = await Project.update({
        projectId,
        toUpdate: { title, content },
      });

      res.status(200).json(updatedProject);
    } catch (error) {
      next(error);
    }
  }
);

projectRouter.delete(
  "/projects/:projectId",
  authenticateUser,
  async function (req, res, next) {
    try {
      const projectId = req.params.projectId;
      const userId = res.locals.user;

      const project = await Project.findById(projectId);

      if (!project || project.userId !== userId) {
        return res.status(403).json({ message: "Forbidden" });
      }

      await Project.deleteById(projectId);

      res.status(200).json({ message: "Project deleted successfully" });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = { projectRouter };
