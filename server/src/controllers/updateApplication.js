const Application = require("../models/Application");

const updateApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { newStatus } = req.body;
    const application = await Application.findById(id);
    if (!application)
      return res.status(404).json({ message: "User doesn't exist." });
    if (application.userId.toString() === id)
      return res.status(403).json({ message: "Invalid parameters!" });
    application.status = newStatus;
    await application.save();
    return res.status(200).json({ message: "Stauts updated successfully!" });
  } catch (err) {
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
    if (application.userId.toString() === id)
      return res.status(403).json({ message: "Invalid parameters!" });
    await application.deleteOne();
    return res
      .status(200)
      .json({ message: "Application deleted successfully!" });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Something went wrong, please try again!" });
  }
};

exports.updateApplicationStatus = updateApplicationStatus;
exports.deleteApplication = deleteApplication;
