const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  image: {
    type: String,
    default: "default.jpg",
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true
  },
  platformIds: {
    type: Array,
    default: []
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
