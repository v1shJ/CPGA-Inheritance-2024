const UserModel = require("../models/userModel");

const getProfile = async (req, res) => {
    console.log("getProfile");
  const user = await UserModel.findById(req.params.id);
  const User = {
    id: user._id,
    name: user.name,
    username: user.username,
    email: user.email,
    image: user.image,
    platformIds: user.platformIds,
  };
  if (user) {
    res.json(User);
  } else {
    res.status(404).json({ message: "User not found" });
  }
};

module.exports = { getProfile };
