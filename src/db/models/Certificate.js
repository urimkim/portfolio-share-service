const mongoose = require('mongoose');
const certificateSchema = require('../schemas/certificate');
const CertificateModel = mongoose.model('Certificate', certificateSchema);

class Certificate {
  static async create({ userId, title, content }) {
    return await CertificateModel.create({ userId, title, content });
  }

  static async findByUserId(userId) {
    return await CertificateModel.find({ userId }).lean();
  }

  static async findByUserIdAndCertificateIdAndUpdate(
    userId,
    certificateId,
    toUpdate
  ) {
    const filter = { userId, _id: certificateId };
    const update = toUpdate;
    const option = { returnOriginal: false };

    const updatedCertificate = await CertificateModel.findOneAndUpdate(
      filter,
      update,
      option
    ).lean();
    return updatedCertificate;
  }

  static async findByUserIdAndCertificateIdAndDelete(
    userId,
    certificateId
  ) {
    return await CertificateModel.findOneAndDelete({
      userId,
      _id: certificateId
    }).lean();
  }
}

module.exports = Certificate;
