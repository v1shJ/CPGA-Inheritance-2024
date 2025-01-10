const express = require("express");
const router = express.Router();
const { getProfile, sendVerificationEmail, verifyEmail, addPlatforms, getAllUsers, ccProblemCount, addDailyProblemPreferences, getALLDailyProblems, saveDailyProblem, updateProblemStatus} = require("../controllers/otherController.jsx");
const authenticate = require("../middleware/auth.js");

router.use(authenticate);

router.post('/update-problem-status', updateProblemStatus);
router.post('/save-daily-problem', saveDailyProblem);
router.get('/get-all-daily-problems', getALLDailyProblems);
router.post('/daily-problem-preferences', addDailyProblemPreferences);
router.get('/verify-email', verifyEmail);
router.get('/getAllUsers', getAllUsers);
router.post('/getcc-problem-count', ccProblemCount);
router.post('/send-verification-email', sendVerificationEmail);
router.post("/:id/addPlatforms", addPlatforms);
router.get("/:id", getProfile);

module.exports = router;
