const express = require("express");
const router = express.Router();
const { getProfile } = require("../controllers/otherController.jsx");
const authenticate = require("../middleware/auth.js");

router.use(authenticate)

router.get("/:id", getProfile);

module.exports = router;

