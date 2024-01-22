// Use QR code library to generate QR codes
// Use use 'qrcode' or any other library of your choice

const QRCode = require("qrcode");

const generateQR = async (text) => {
  try {
    const qrCode = await QRCode.toDataURL(text);
    return qrCode;
  } catch (err) {
    console.error(err);
    throw new Error("Failed to generate QR code");
  }
};

module.exports = { generateQR };
