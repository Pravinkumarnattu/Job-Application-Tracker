const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true,
  },
  googleRefreshToken: {
    type: String,
  },
  authProvider: {
    type: String,
    enum: ["local", "google"],
  },
  name: String,
});
