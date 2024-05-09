const mongoose = require('mongoose');
const projectSchema = require('../schemas/project');
const ProjectModel = mongoose.model('Project', projectSchema);

class Project {
  static async create({ userId, title, content }) {
    return await ProjectModel.create({ userId, title, content });
  }

  static async findByUserId(userId) {
    return await ProjectModel.find({ userId: userId }).lean();
  }

  static async findByUserIdAndProjectIdAndUpdate({
    userId,
    projectId: _id,
    toUpdate
  }) {
    const filter = { userId, _id };
    const update = toUpdate;
    const option = { returnOriginal: false };

    const updatedProject = await ProjectModel.findOneAndUpdate(
      filter,
      update,
      option
    ).lean();
    return updatedProject;
  }

  static async findByUserIdAndProjectIdAndDelete({ userId, projectId: _id }) {
    return await ProjectModel.findOneAndDelete({
      userId,
      _id
    }).lean();
  }
}

module.exports = Project;
