const { model } = require('mongoose');
const awardSchema = require('../schemas/award');

const AwardModel = model('Award', awardSchema);

class Award {
  static async create(newAward) {
    return await AwardModel.create(newAward);
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
