const axios = require("axios");

const exchangeCodeForTokens = async (code) => {
  const payload = {
    code,
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    redirect_uri: process.env.GOOGLE_REDIRECT_URI,
    grant_type: "authorization_code",
  };
  const response = await axios.post(
    "https://oauth2.googleapis.com/token",
    payload,
  );
  return response.data;
};

const getGoogleUserProfile = async (accessToken) => {
  const response = await axios.get(
    "https://www.googleapis.com/oauth2/v2/userinfo",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  return response.data;
};

module.exports = { exchangeCodeForTokens, getGoogleUserProfile };
