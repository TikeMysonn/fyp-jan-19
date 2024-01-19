const express = require("express");
const certController = require("../controllers/certController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Use the authMiddleware to protect routes that require authentication
router.use(authMiddleware.protect);

router.post("/certificates", certController.createCertificate);
router.get(
  "/certificates",
  authMiddleware.restrictTo("admin"),
  certController.getAllCertificates
);
router.get("/certificates/:id", certController.getCertificate);
router.delete(
  "/certificates/:id",
  authMiddleware.restrictTo("admin"),
  certController.deleteCertificate
);

router.post("/verifyCertificate", certController.verifyCertificate);

module.exports = router;
