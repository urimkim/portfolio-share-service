const { EducationModel } = require("../schemas/education");

class Education {
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

module.exports =  {Education};

