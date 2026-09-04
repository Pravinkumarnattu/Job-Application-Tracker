const jwt = require("jsonwebtoken");
const User = require("../models/User");
const {
  exchangeCodeForTokens,
  getGoogleUserProfile,
} = require("../services/googleOAuthService");

const googleAuth = async (req, res) => {
  try {
    const { code } = req.body;
    const tokens = await exchangeCodeForTokens(code);
    const { access_token, refresh_token } = tokens;
    const googleProfile = await getGoogleUserProfile(access_token);
    const { email, id: googleId, name } = googleProfile;
    const existingUserByGoogleId = await User.findOne({ googleId });
    let user;
    if (!existingUserByGoogleId) {
      const existingUserByEmail = await User.findOne({ email });
      if (!existingUserByEmail) {
        const newUser = new User({
          email,
          googleId,
          name,
          authProvider: "google",
          googleRefreshToken: refresh_token,
        });
        await newUser.save();
        user = newUser;
      } else {
        existingUserByEmail.googleId = googleId;
        existingUserByEmail.googleRefreshToken = refresh_token;
        await existingUserByEmail.save();
        user = existingUserByEmail;
      }
    } else {
      existingUserByGoogleId.googleRefreshToken = refresh_token;
      await existingUserByGoogleId.save();
      user = existingUserByGoogleId;
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    return res.status(200).json({
      token,
      user: { email: user.email, googleId: user.googleId, name: user.name },
    });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = googleAuth;
