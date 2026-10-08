const express = require("express");
const router = express.Router();

router.post("/add", require("../middleware/auth"), require("../controllers/addApplication"));


module.exports = router;
