const mongoose = require('mongoose');
const awardSchema = require('../schemas/award');

const AwardModel = mongoose.model('Award', awardSchema);

class Award {
  static async create({ userId, awardId, title, content }) {
    return await AwardModel.create({ userId, awardId, title, content });
  }

  static async findById(awardId) {
    return await AwardModel.findOne({ awardId }).lean();
  }

  static async findByUserId(userId) {
    return await AwardModel.find(userId).lean();
  }

  static async findByUserIdAndAwardIdAndDelete({ userId, awardId }) {
    return await AwardModel.findOneAndDelete({
      userId,
      awardId
    }).lean();
  }

  static async update({ awardId, toUpdate, userId }) {
    const filter = { awardId, userId };
    const update = toUpdate;
    const option = { returnOriginal: false };

    const updatedAward = await AwardModel.findOneAndUpdate(
      filter,
      update,
      option
    ).lean();
    return updatedAward;
  }
}

module.exports = Award;
