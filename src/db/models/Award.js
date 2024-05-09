const mongoose = require('mongoose');
const awardSchema = require('../schemas/award');
const AwardModel = mongoose.model('Award', awardSchema);

class Award {
  static async create({ userId, title, content }) {
    return await AwardModel.create({ userId, title, content });
  }

  static async findByUserId(userId) {
    return await AwardModel.find(userId).lean();
  }

  static async findByUserIdAndAwardIdAndUpdate({
    userId,
    awardId: _id,
    toUpdate
  }) {
    const filter = { userId, _id };
    const update = toUpdate;
    const option = { returnOriginal: false };

    const updatedAward = await AwardModel.findOneAndUpdate(
      filter,
      update,
      option
    ).lean();
    return updatedAward;
  }

  static async findByUserIdAndAwardIdAndDelete({ userId, awardId: _id }) {
    return await AwardModel.findOneAndDelete({
      userId,
      _id
    }).lean();
  }
}

module.exports = Award;
