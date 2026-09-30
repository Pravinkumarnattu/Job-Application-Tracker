const User = require("../models/User");

const profile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select(
      "-password -googleId -googleRefreshToken -authProvider",
    );
    if (user) return res.status(200).json(user);
    else return res.status(404).json({ message: "No user found" });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Something went wrong, please try again!" });
  }
};

module.exports = profile;
