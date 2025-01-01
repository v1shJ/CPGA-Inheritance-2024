const express = require("express");
const router = express.Router();
const { getProfile, sendVerificationEmail, verifyEmail, addPlatforms} = require("../controllers/otherController.jsx");
const authenticate = require("../middleware/auth.js");

router.use(authenticate)

router.post("/:id/addPlatforms", addPlatforms);
router.get('/verify-email', verifyEmail);
router.post('/send-verification-email', sendVerificationEmail);
router.get("/:id", getProfile);

module.exports = router;
