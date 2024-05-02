const { Education } = require("../db");
const { v4 : uuidv4 } = require("uuid");

class EducationService {
  static async addEducation({ user_id, school, major, status }) {
    const id = uuidv4();

    const newEducation = { id, user_id, school, major, status };
    const createdNewEducation = await Education.create({ newEducation });

    return createdNewEducation;
  }

  static async getEducation({ educationId }) {
    const education = await Education.findById({ educationId });
    if (!education) {
      const errorMessage =
        "해당 id를 가진 학력 데이터는 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    return education;
  }

  static async getEducationList({ user_id }) {
    const educations = await Education.findByUserId({ user_id });
    return educations;
  }

  static async setEducation({ EducationId, toUpdate }) {
    let education = await Education.findById({ educationId });

    if (!education) {
      const errorMessage =
        "해당 id를 가진 학력 데이터는 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    if (toUpdate.school) {
      const fieldToUpdate = "school";
      const newValue = toUpdate.school;
      education = await Education.update({ educationId, fieldToUpdate, newValue });
    }

    if (toUpdate.major) {
      const fieldToUpdate = "major";
      const newValue = toUpdate.major;
      education = await Education.update({ educationId, fieldToUpdate, newValue });
    }

    if (toUpdate.status) {
        const fieldToUpdate = "status";
        const newValue = toUpdate.status;
        education = await Education.update({ educationId, fieldToUpdate, newValue });
      }

    return education;
  }

  static async deleteEducation({ educationId }) {
    const isDataDeleted = await Education.deleteById({ educationId });

    if (!isDataDeleted) {
      const errorMessage =
        "해당 id를 가진 학력 데이터는 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    return { status: "ok" };
  }
}

module.exports =  EducationService;
