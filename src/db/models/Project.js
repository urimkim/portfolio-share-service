const { ProjectModel } = require("../schemas/project");

class Project {
  static async create(newProject) {
    return await ProjectModel.create(newProject);
  }

  static async findById({ projectId }) {
    return await ProjectModel.findOne({ id: projectId });
  }

  static async findByUserId({ userId }) {
    return await ProjectModel.find({ userId });
  }

  static async update({ projectId, fieldToUpdate, newValue }) {
    const filter = { id: projectId };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedProject = await ProjectModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedProject;
  }
}

module.exports = { Project };
