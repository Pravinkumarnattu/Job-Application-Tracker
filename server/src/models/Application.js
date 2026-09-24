const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required,
    },
    role: {
      type: String,
      required,
    },
    status: {
      enum: ["applied", "interviewing", "offer", "rejected"],
      default: "applied",
    },
    dateApplied: {
      type: Date,
      required,
    },
    jobLink: {
      type: String,
    },
    notes: {
      type: String,
    },
    followUpDate: {
      type: Date,
    },
    calendarEventId: {
      type: String,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required,
    },
  },
  { timestamps: true },
);

const Application = mongoose.model("Application", applicationSchema);
module.exports = Application;
