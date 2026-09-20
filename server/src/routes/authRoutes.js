const express = require("express");
const router = express.Router();

router.post("/google", require("../controllers/authentication/googleAuth"));
router.post("/login", require("../controllers/authentication/login"));
router.post("/register", require("../controllers/authentication/register"));

module.exports = router;
