const { Project } = require("../db");
const { v4 : uuidv4 } = require("uuid");

class ProjectService {
  static async addProject({ user_id, title, content }) {
    const id = uuidv4();

    const newProject = { id, user_id, title, content };
    const createdNewProject = await Project.create({ newProject });

    return createdNewProject;
  }

  static async getProject({ projectId }) {
    const project = await Project.findById({ projectId });
    if (!project) {
      const errorMessage =
        "해당 id를 가진 프로젝트 데이터는 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    return project;
  }

  static async getProjectList({ user_id }) {
    const projects = await Project.findByUserId({ user_id });
    return projects;
  }

  static async setProject({ projectId, toUpdate }) {
    let project = await Project.findById({ projectId });

    if (!project) {
      const errorMessage =
        "해당 id를 가진 프로젝트 데이터는 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

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

    return project;
  }

  static async deleteProject({ projectId }) {
    const isDataDeleted = await Project.deleteById({ projectId });

    if (!isDataDeleted) {
      const errorMessage =
        "해당 id를 가진 프로젝트 데이터는 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    return { status: "ok" };
  }
}

module.exports =  ProjectService;
