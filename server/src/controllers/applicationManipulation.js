const Application = require("../models/Application");

const updateApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { newStatus } = req.body;
    const application = await Application.findById(id);
    if (!application)
      return res.status(404).json({ message: "Application doesn't exist." });
    if (application.userId.toString() !== req.user.id)
      return res.status(403).json({ message: "Invalid parameters!" });
    application.status = newStatus;
    await application.save();
    return res.status(200).json({ message: "Status updated successfully!" });
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).json({ message: err.message });
    }
    return res
      .status(500)
      .json({ message: "Something went wrong, please try again!" });
  }
};

const deleteApplication = async (req, res) => {
  try {
    const { id } = req.params;
    const application = await Application.findById(id);
    if (!application)
      return res.status(404).json({ message: "Application doesn't exist." });
    if (application.userId.toString() !== req.user.id)
      return res.status(403).json({ message: "Invalid parameters!" });
    await application.deleteOne();
    return res
      .status(200)
      .json({ message: "Application deleted successfully!" });
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).json({ message: err.message });
    }
    return res
      .status(500)
      .json({ message: "Something went wrong, please try again!" });
  }
};

const editApplication = async (req, res) => {
  try {
    const { id } = req.params;
    const { formData } = req.body;
    const application = await Application.findById(id);
    if (!application)
      return res.status(404).json({ message: "Application doesn't exist." });
    if (application.userId.toString() !== req.user.id)
      return res.status(403).json({ message: "Invalid parameters!" });
    const { company, role, status, dateApplied, jobLink, followUpDate, notes } =
      formData;
    Object.assign(application, {
      company,
      role,
      status,
      dateApplied,
      jobLink,
      followUpDate,
      notes,
    });
    await application.save();
    return res
      .status(200)
      .json({ message: "Application updated successfully!" });
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).json({ message: err.message });
    }
    return res
      .status(500)
      .json({ message: "Something went wrong, please try again!" });
  }
};

module.exports = {
  updateApplicationStatus,
  deleteApplication,
  editApplication,
};
