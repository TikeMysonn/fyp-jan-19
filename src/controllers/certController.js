const Certificate = require("../models/Certificate");
const QRCode = require("../utils/qrGenerator");

exports.createCertificate = async (req, res) => {
  try {
    const { certType, courseName, grade, studentName, studentId, issueYear } =
      req.body;

    // Check if a certificate for the given studentId already exists
    const existingCertificate = await Certificate.findOne({ studentId });
    if (existingCertificate) {
      return res.status(409).json({
        status: "fail",
        message: "Certificate for the given student ID already exists",
      });
    }

    // Create new certificate
    const newCertificate = await Certificate.create({
      certType,
      courseName,
      grade,
      studentName,
      studentId,
      issueYear,
    });

    // Generate QR code
    const qrCode = await QRCode.generateQR(newCertificate._id.toString());

    res.status(201).json({
      status: "success",
      data: {
        certificate: newCertificate,
        qrCode,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

exports.getAllCertificates = async (req, res) => {
  try {
    const certificates = await Certificate.find();
    res.status(200).json({
      status: "success",
      results: certificates.length,
      data: {
        certificates,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

exports.getCertificate = async (req, res) => {
  try {
    const certificate = await Certificate.findById(req.params.id);
    if (!certificate) {
      return res.status(404).json({
        status: "fail",
        message: "No certificate found with that ID",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        certificate,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

exports.deleteCertificate = async (req, res) => {
  try {
    const certificate = await Certificate.findByIdAndDelete(req.params.id);
    if (!certificate) {
      return res.status(404).json({
        status: "fail",
        message: "No certificate found with that ID",
      });
    }

    res.status(200).json({
      // Changed from 204 to 200
      status: "success",
      message: "Certificate successfully deleted",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};
