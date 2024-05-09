const mongoose = require('mongoose');
const certificateSchema = require('../schemas/certificate');
const CertificateModel = mongoose.model('Certificate', certificateSchema);

class Certificate {
  static async create({ userId, certificateId, title, content }) {
    return await CertificateModel.create({
      userId,
      certificateId,
      title,
      content
    });
  }

  static async findById(certificateId) {
    return await CertificateModel.findOne({ certificateId }).lean();
  }

  static async findByUserId(userId) {
    return await CertificateModel.find(userId).lean();
  }

  static async findByUserIdAndCertificateIdAndDelete({
    userId,
    certificateId
  }) {
    return await CertificateModel.findOneAndDelete({
      userId,
      certificateId
    }).lean();
  }

  static async findByUserIdAndCertificateIdAndUpdate({
    userId,
    certificateId,
    toUpdate
  }) {
    const filter = { userId, certificateId };
    const update = toUpdate;
    const option = { returnOriginal: false };

    const updatedCertificate = await CertificateModel.findOneAndUpdate(
      filter,
      update,
      option
    ).lean();
    return updatedCertificate;
  }
}

module.exports = Certificate;
