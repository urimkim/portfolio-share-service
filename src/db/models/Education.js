const mongoose = require('mongoose');
const EducationSchema = require('../schemas/education');

const EducationModel = mongoose.model('Education', EducationSchema);

class Education {
  static async create({userId, educationId, school, major, status}) {
    return await EducationModel.create({userId, educationId, school, major, status});
  }
  static async findById( educationId ) {
    return await EducationModel.findOne({ educationId });
  }

  static async findByUserId( userId ) {
    return await EducationModel.find({ userId });
  }

  static async deleteById( educationId ) {
    return await EducationModel.deleteOne({ educationId });
  }

  static async update({ educationId, toUpdate }) {
    const filter = { educationId };
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

module.exports =  { Education } ;
