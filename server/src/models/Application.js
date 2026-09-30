const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["applied", "interviewing", "offer", "rejected"],
      default: "applied",
    },
    dateApplied: {
      type: Date,
      required: true,
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
      required: true,
    },
  },
  { timestamps: true },
);

const Application = mongoose.model("Application", applicationSchema);
module.exports = Application;
