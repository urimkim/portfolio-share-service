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

  static async deleteById({ userId }) {
    return await ProjectModel.deleteOne({userId });
  }

  static async update({ userId, toUpdate }) {
    const filter = { userId };
    const update = toUpdate;
    const options = { returnOriginal: false };

    const updatedProject = await ProjectModel.findOneAndUpdate(
      filter,
      update,
      options
    );
    return updatedProject;
  }
}

module.exports = { Project };
