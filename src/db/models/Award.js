const { AwardModel } = require("../schemas/award");

class Award {
  static async create(newAward) {
    return await AwardModel.create(newAward);
  }

  static async findById({ awardId }) {
    return await AwardModel.findOne({ id: awardId });
  }

  static async findByUserId({ userId }) {
    return await AwardModel.find({ userId });
  }

  static async update({ awardId, fieldToUpdate, newValue }) {
    const filter = { id: awardId };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedAward = await AwardModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedAward;
  }
}

module.exports = { Award };
