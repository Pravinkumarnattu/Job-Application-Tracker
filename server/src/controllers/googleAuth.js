const jwt = require("jsonwebtoken");
const User = require("../models/User");
const exchangeCodeForTokens = require("../services/googleOAuthService/exchangeCodeForTokens");
const getGoogleUserProfile = require("../services/googleOAuthService/getGoogleUserProfile");

const googleAuth = async (req, res) => {
  try {
    const { code } = req.body;
    const tokens = await exchangeCodeForTokens(code);
    const { access_token, refresh_token } = tokens;
    const googleProfile = await getGoogleUserProfile(access_token);
    const { email, googleId } = googleProfile;
    const existingUserByGoogleId = await User.findOne({ googleId });
    const token = null;
    if (!existingUserByGoogleId) {
      const existingUserByEmail = await User.findOne({ email });
      if (existingUserByEmail) {
        existingUserByEmail.googleId = googleId;
        existingUserByEmail.googleRefreshToken = refresh_token;
        await existingUserByEmail.save();
      } else {
        const newUser = new User.create({
          email,
          googleId,
          authProvider: "google",
          googleRefreshToken: refresh_token,
        });
        await newUser.save();
      }
    } else {
      token = jwt.sign({ id: existingUserByGoogleId._id}, process.env.JWT_SECRET);
      existingUserByGoogleId.googleRefreshToken = refresh_token;
      await existingUserByGoogleId.save();
    }
    
  } catch (err) {}
};
