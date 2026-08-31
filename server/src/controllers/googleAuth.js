const User = require("User")
const exchangeCodeForTokens = require("../services/googleOAuthService/exchangeCodeForTokens")
const getGoogleUserProfile = require("../services/googleOAuthService/getGoogleUserProfile")

const googleAuth = async (req, res) => {
    try {
        const {code} = req.body
        const tokens = await exchangeCodeForTokens(code);
        const {access_token, refresh_token} = tokens
        const googleProfile  = await getGoogleUserProfile(access_token)
        
    }catch(err) {

    }
}