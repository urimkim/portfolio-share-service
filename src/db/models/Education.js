const mongoose = require('mongoose');
const educationSchema = require('../schemas/education');
const EducationModel = mongoose.model('Education', educationSchema);

class Education {
  static async create({ userId, school, major, status }) {
    return await EducationModel.create({ userId, school, major, status });
  }

  static async findByUserId(userId) {
    return await EducationModel.find({ userId }).lean();
  }

  static async findByUserIdAndEducationIdAndUpdate(
    userId,
    educationId,
    toUpdate
  ) {
    const filter = { userId, _id: educationId };
    const update = toUpdate;
    const options = { returnOriginal: false };

    const updatedEducation = await EducationModel.findOneAndUpdate(
      filter,
      update,
      options
    ).lean();
    return updatedEducation;
  }

  static async findByUserIdAndEducationIdAndDelete(
    userId,
    educationId
  ) {
    return await EducationModel.findOneAndDelete({
      userId,
      _id: educationId
    }).lean();
  }
}

module.exports = Education;
