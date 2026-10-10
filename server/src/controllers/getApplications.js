const Application = require("../models/Application");

const getApplications = async (req, res) => {
  try {
    const applications = await Application.find({ userId: req.user.id }).sort({
      createdAt: -1,
    });
    return res.status(200).json(applications);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Something went wrong, please try again!" });
  }
};

module.exports = getApplications;
