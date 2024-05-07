const { model } = require("mongoose");
const { AwardSchema } = require("../schemas/award");

const AwardModel = model("Award", AwardSchema);

class Award {
  static async create(newAward) {
    return await AwardModel.create(newAward);
  }

  static async findById(awardId) {
    return await AwardModel.findOne(awardId);
  }

  static async findByUserId(userId) {
    return await AwardModel.find(userId);
  }

  static async deleteById(awardId) {
    return await AwardModel.deleteOne(awardId);
  }

  static async update({ awardId, toUpdate }) {
    const filter = { awardId };
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

module.exports = { Award };
