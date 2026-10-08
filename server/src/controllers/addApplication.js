const Application = require("../models/Application");

const addApplication = async (req, res) => {
  const { company, role, status, dateApplied, jobLink, followUpDate, notes } =
    req.body;
  const applicationDetails = {
    company,
    role,
    status,
    dateApplied,
    jobLink,
    followUpDate,
    notes,
    userId: req.user.id,
  };

  try {
    await Application.create(applicationDetails);
    return res.status(201).json({ message: "Application added successfully!" });
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).json({ message: err.message });
    }
    return res
      .status(500)
      .json({ message: "Something went wrong, please try again!" });
  }
};

module.exports = addApplication;
