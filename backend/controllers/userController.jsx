const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const UserModel = require("../models/userModel");
const secretkey = process.env.SECRET_KEY;

const registerUser = async (req, res) => {
  const { name, email, username, password } = req.body;

  // Check if email already exists
  const existingUser = await UserModel.findOne({ email: email });
  if (existingUser) {
    return res
      .status(400)
      .json({ status: "failed", message: "User already exists" });
  }

  const existingUsername = await UserModel.findOne({ username: username });

  if (existingUsername) {
    return res
      .status(400)
      .json({ status: "failed", message: "Username already exists" });
  }

  // Check if file was uploaded and use a fallback if not
  const image = req.file ? req.file.filename : "";

  bcrypt.genSalt(10, (_err, salt) => {
    bcrypt.hash(password, salt, async (err, hash) => {
      if (err) throw err;
      const user = new UserModel({
        image: image,
        name,
        email,
        username,
        password: hash,
      });

      try {
        await user.save();
        let token = jwt.sign({ email: email, userID: user._id }, secretkey);

        res.json({
          status: "success",
          message: "Login successful",
          token: token,
          user: {
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email,
            image: user.image,
            platformIds: user.platformIds,
          },
        });
      } catch (err) {
        res.status(400).json({ status: "failed", message: err.message });
      }
    });
  });
};

const loginUser = async (req, res) => {
  const { emailOrUsername, password } = req.body;

  // Check if email or username exists
  const user = await UserModel.findOne({
    $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
  });

  if (!user) {
    return res
      .status(400)
      .json({ status: "failed", message: "User does not exist" });
  }

  // Check if password is correct
  bcrypt.compare(password, user.password, (err, isMatch) => {
    if (err) throw err;
    if (!isMatch) {
      return res
        .status(400)
        .json({ status: "failed", message: "Invalid credentials" });
    }

    let token = jwt.sign({ email: user.email, userID: user._id }, secretkey);

    res.json({
      status: "success",
      message: "Login successful",
      token: token,
      user: {
        id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        image: user.image,
        platformIds: user.platformIds,
      },
    });
  });
};

module.exports = {
  registerUser,
  loginUser,
};
