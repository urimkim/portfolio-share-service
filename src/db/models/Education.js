const { EducationModel } = require("../schemas/education");

class Education {
  static async create(newEducation) {
    return await EducationModel.create(newEducation);
  }

  static async findById({ educationId }) {
    return await EducationModel.findOne({ id: educationId });
  }

  static async findByUserId({ userId }) {
    return await EducationModel.find({ userId });
  }

  static async deleteById({ userId }) {
    return await EducationModel.deleteOne({userId });
  }

  static async update({ userId, toUpdate }) {
    const filter = { userId };
    const update = toUpdate;
    const options = { returnOriginal: false };

    const updatedEducation = await EducationModel.findOneAndUpdate(
      filter,
      update,
      options,
    );
    return updatedEducation;
  }

}

module.exports =  { Education };
