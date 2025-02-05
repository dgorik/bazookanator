const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const VerificationCode = Math.floor(10000 + Math.random() * 900000).toString()

const UserVerificationSchema = new mongoose.Schema({
  userName: { type: String, unique: true },
  email: { type: String, unique: true },
  password: String,
  verified: Boolean
});

module.exports = mongoose.model("UserVerification", UserVerificationSchema);