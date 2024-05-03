const { CertificateModel } = require("../schemas/certificate");

class Certificate {
  static async create(newCertificate) {
    return await CertificateModel.create(newCertificate);
  }

  static async findById({ certificateId }) {
    return await CertificateModel.findOne({ id: certificateId });
  }

  static async findByUserId({ userId }) {
    return await CertificateModel.find({ userId });
  }

  static async update({ certificateId, fieldToUpdate, newValue }) {
    const filter = { id: certificateId };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedCertificate = await CertificateModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedCertificate;
  }
}

module.exports = { Certificate };
