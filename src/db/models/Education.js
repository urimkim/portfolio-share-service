const mongoose = require('mongoose');
const educationSchema = require('../schemas/education');

const EducationModel = mongoose.model('Education', educationSchema);

class Education {
  static async create({ userId, educationId, school, major, status }) {
    return await EducationModel.create({
      userId,
      educationId,
      school,
      major,
      status
    });
  }
  static async findById(educationId) {
    return await EducationModel.findOne(educationId).lean();
  }

  static async findByUserId(userId) {
    return await EducationModel.find({ userId }).lean();
  }

  static async findByUserIdAndEducationIdAndDelete({ userId, educationId }) {
    return await EducationModel.findOneAndDelete({
      userId,
      educationId
    }).lean();
  }

  static async update({ educationId, toUpdate }) {
    const filter = { educationId };
    const update = toUpdate;
    const options = { returnOriginal: false };

    const updatedEducation = await EducationModel.findOneAndUpdate(
      filter,
      update,
      options
    ).lean();
    return updatedEducation;
  }
}

module.exports = Education;
