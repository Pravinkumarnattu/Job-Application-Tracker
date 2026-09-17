const express = require("express");
const router = express.Router();

router.post("/google", require("../controllers/googleAuth"));

module.exports = router;
