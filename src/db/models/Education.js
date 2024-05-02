import { EducationModel } from "../schemas/education";

class Education {
  // 1. 새로운 객체를 인자로 받아 생성
  // 2. model을 사용하여 db에 새로운 프로젝트 데이터 저장
  // 3. 그 데이터를 반환
  static async create(newEducation) {
    return await EducationModel.create(newEducation);
  }

  static async findById({ educationId }) {
    return await EducationModel.findOne({ id: educationId });
  }

  static async findByUserId({ user_id }) {
    return await EducationModel.find({ user_id });
  }

  static async update({ educationId, fieldToUpdate, newValue }) {
    const filter = { id: educationId };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedEducation = await EducationModel.findOneAndUpdate(
      filter,
      update,
      option,
    );
    return updatedEducation;
  }


}

export { Education };

