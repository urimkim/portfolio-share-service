const { model } = require('mongoose');
const projectSchema = require('../schemas/project');

const ProjectModel = model('Project', projectSchema);

class Project {
  static async create({ userId, projectId, title, content }) {
    return await ProjectModel.create({ userId, projectId, title, content });
  }

  static async findById(projectId) {
    return await ProjectModel.findOne(projectId).lean();
  }

  static async findByUserId(userId) {
    return await ProjectModel.find(userId).lean();
  }

  static async findByUserIdAndProjectIdAndDelete({ userId, projectId }) {
    return await ProjectModel.findOneAndDelete({
      userId,
      projectId
    }).lean();
  }

  static async update({ projectId, toUpdate }) {
    const filter = { projectId };
    const update = toUpdate;
    const option = { returnOriginal: false };

    const updatedProject = await ProjectModel.findOneAndUpdate(
      filter,
      update,
      option
    ).lean();
    return updatedProject;
  }
}

module.exports = Project;
