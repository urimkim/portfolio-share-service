const { model } = require('mongoose');
const { CertificateSchema } = require('../schemas/certificate');

const CertificateModel = model('Certificate', CertificateSchema);

class Certificate {
  static async create(newCertificate) {
    return await CertificateModel.create(newCertificate);
  }

  static async findById(certificateId) {
    return await CertificateModel.findOne(certificateId).lean();
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

  static async update({ certificateId, fieldToUpdate, newValue }) {
    const filter = { id: certificateId };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedCertificate = await CertificateModel.findOneAndUpdate(
      filter,
      update,
      option
    ).lean();
    return updatedCertificate;
  }
}

module.exports = { Certificate };
