const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const UserVerificationSchema = new mongoose.Schema({
  userName: { type: String, unique: true },
  email: { type: String, unique: true },
  password: String,
  verified: Boolean
});

module.exports = mongoose.model("UserVerification", UserVerificationSchema);