const mongoose = require('mongoose');
const projectSchema = require('../schemas/project');
const ProjectModel = mongoose.model('Project', projectSchema);

class Project {
  static async create({ userId, title, content }) {
    return await ProjectModel.create({ userId, title, content });
  }

  static async findByUserId(userId) {
    return await ProjectModel.find({ userId }).lean();
  }

  static async findByUserIdAndProjectIdAndUpdate(
    userId,
    projectId,
    toUpdate
  ) {
    const filter = { userId, _id: projectId };
    const update = toUpdate;
    const option = { returnOriginal: false };

    const updatedProject = await ProjectModel.findOneAndUpdate(
      filter,
      update,
      option
    ).lean();
    return updatedProject;
  }

  static async findByUserIdAndProjectIdAndDelete(userId, projectId) {
    return await ProjectModel.findOneAndDelete({
      userId,
      _id: projectId,
    }).lean();
  }
}

module.exports = Project;
