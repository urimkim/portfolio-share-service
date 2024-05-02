import { ProjectModel } from "../schemas/project";

class Project {
  // 1. 새로운 객체를 인자로 받아 생성
  // 2. model을 사용하여 db에 새로운 프로젝트 데이터 저장
  // 3. 그 데이터를 반환
  static async create(newProject) {
    return await ProjectModel.create(newProject);
  }

  static async findById({ projectId }) {
    return await ProjectModel.findOne({ id: projectId });
  }

  static async findByUserId({ user_id }) {
    return await ProjectModel.find({ user_id });
  }

  static async update({ projectId, fieldToUpdate, newValue }) {
    const filter = { id: projectId };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedProject = await ProjectModel.findOneAndUpdate(
      filter,
      update,
      option,
    );
    return updatedProject;
  }


}

export { Project };

