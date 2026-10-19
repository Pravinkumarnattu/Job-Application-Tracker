const Application = require("../models/Application");

const updateApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { newStatus } = req.body;
    const application = await Application.findById(id);
    application.status = newStatus;
    await application.save();
    return res.status(200).json({ message: "Stauts updated successfully!" });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Something went wrong, please try again!" });
  }
};

module.exports = updateApplicationStatus;
