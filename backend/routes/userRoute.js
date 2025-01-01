const express = require("express");
const {registerUser, loginUser, addPlatforms} = require("../controllers/userController.jsx");
const router = express.Router();
const upload = require("../config/multerConfig");

router.post("/register", upload.single("file"), registerUser);
router.post("/login", loginUser);
router.post("/:id/addPlatforms", addPlatforms);

module.exports = router;
