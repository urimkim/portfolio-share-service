const { model } = require('mongoose');
const { ProSchema } = require('../schemas/project');

const ProjectModel = model('Project', ProSchema);

class Project {
  static async create(newProject) {
    return await ProjectModel.create(newProject);
  }

  static async findById(projectId) {
    return await ProjectModel.findOne(projectId).lean();
  }

  static async findByUserId(userId) {
    return await ProjectModel.find(userId).lean();
  }

  static async deleteById(projectId) {
    return await ProjectModel.deleteOne(projectId);
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

module.exports = { Project };
