const UserModel = require("../models/userModel");
const frontendUrl = process.env.FRONTEND_URL;
const jwt = require("jsonwebtoken");
const secretkey = process.env.SECRET_KEY;

const addPlatforms = async (req, res) => {
  const userId = req.params.id;
  const platformIds = req.body;

  const user = await UserModel.findById(userId);
  if (user) {
    user.platformIds = platformIds;
    await user.save();
    res.json({ message: "Platform IDs added successfully" });
  } else {
    res.status(404).json({ message: "User not found" });
  }
};

const getProfile = async (req, res) => {
  const user = await UserModel.findById(req.params.id);
  if(!user) {
    return res.status(404).json({ message: "User not found" });
  }
    const { name, email, username, platformIds, emailVerified, problemTags, ratingRange, dailyProblems, dailyPoints } = user;
    const User = { name, email, username, platformIds, emailVerified, problemTags, ratingRange, dailyProblems, dailyPoints };
    console.log("user data: "+  User);
    res.json(User);
};

const transporter = require("../config/transporter");

// Send verification email
const sendVerificationEmail = async (req, res) => {
  // console.log(req.body);
  const {email, id } = req.body;

  try {
    let token = jwt.sign({ email: email, userId: id }, secretkey);
    const verificationLink = `${frontendUrl}/verify-email?token=${token}`;
    console.log(verificationLink);

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: "Verify Your Email",
      html: `<p>Click <a href="${verificationLink}">here</a> to verify your email.</p>`,
    });

    res.status(200).json({ message: "Verification email sent!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error sending email" });
  }
};

const verifyEmail = async (req, res) => {
  const token = req.query.token;
  if (!token) {
    return res.status(400).json({ message: "Verification token is missing." });
  }

  try {
    const userId = req.user.userID;

    // Find the user by ID
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    if (user.emailVerified) {
      return res
        .status(400)
        .json({ message: "Email has already been verified." });
    }

    // Update the emailVerified field
    user.emailVerified = true;
    await user.save();

    return res.status(200).json({ message: "Email verified successfully!" });
  } catch (error) {
    console.error("Error verifying email:", error);
    return res.status(400).json({ message: "Invalid or expired token." });
  }
};

const getAllUsers = async (req, res) => {
  const users = await UserModel.find();
  // console.log(users);
  res.json(users);
}


const puppeteer = require('puppeteer');

const ccProblemCount = async (req, res) => {
  const { userHandle } = req.body;

  if (!userHandle) {
    return res.status(400).json({ error: 'User handle is required' });
  }

  const url = `https://www.codechef.com/users/${userHandle}`;

  try {
    // Launch Puppeteer
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Navigate to CodeChef user page
    await page.goto(url, { waitUntil: 'domcontentloaded' });

    // Extract the "Total Problems Solved" text
    const totalProblemsSolved = await page.evaluate(() => {
      const h3Tag = Array.from(document.querySelectorAll('h3')).find((h3) =>
        h3.textContent.includes('Total Problems Solved')
      );
      if (h3Tag) {
        // Use a regular expression to extract the integer value
        const match = h3Tag.textContent.match(/\d+/);
        return match ? parseInt(match[0], 10) : null;
      }

      return null;

    });

    // Close the browser
    await browser.close();

    if (totalProblemsSolved) {
      res.json({ totalProblemsSolved });
    } else {
      res.status(404).json({ error: 'User or data not found' });
    }
  } catch (error) {
    console.error(`Failed to fetch the page: ${error.message}`);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const addDailyProblemPreferences = async (req, res) => {
  // console.log(req.body);
  const userId = req.user.userID;
  const { problemTags, ratingRange } = req.body;

  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.problemTags = problemTags;
    user.ratingRange = ratingRange;
    await user.save();

    res.json({ message: "Daily problem preferences saved successfully" });
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

const getALLDailyProblems = async (req, res) => {
  const userId = req.user.userID;
  const user = await UserModel.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  // console.log(user.dailyProblems);
  res.json(user.dailyProblems);
}

const saveDailyProblem = async (req, res) => {
  // console.log(req.body);
  const userId = req.user.userID;
  const dailyProblem = req.body;
  const user = await UserModel.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const dailyproblem = {
    name: dailyProblem.name,
    rating: dailyProblem.rating,
    tags: dailyProblem.tags,
    link:`https://codeforces.com/contest/${dailyProblem.contestId}/problem/${dailyProblem.index}`,
    points : dailyProblem.points!==0 ? dailyProblem.points: 500,
  }
  // console.log(dailyproblem);
  user.dailyProblems.push(dailyproblem);
  await user.save();
  res.json({ message: "Daily problem saved successfully" });
}

const updateProblemStatus = async (req, res) => {
  const userId = req.user.userID;
  const { contestId, index, points} = req.body;
  console.log(req.body);

  const user = await UserModel.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const Link = `https://codeforces.com/contest/${contestId}/problem/${index}`;
  const problem = user.dailyProblems.find(
    (problem) => problem.link === Link
  );
  console.log(problem);
  if (!problem) {
    return res.status(404).json({ message: "Problem not found" });
  }
  problem.status = "solved";
  user.dailyPoints += points;
  await user.save();
  console.log(user);
  res.json({ message: "Problem status updated successfully" });
}

module.exports = {
  addPlatforms,
  getProfile,
  sendVerificationEmail,
  verifyEmail,
  getAllUsers,
  ccProblemCount,
  addDailyProblemPreferences,
  getALLDailyProblems,
  saveDailyProblem,
  updateProblemStatus
};