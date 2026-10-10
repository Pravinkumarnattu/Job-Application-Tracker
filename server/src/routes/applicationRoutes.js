const express = require("express");
const router = express.Router();

router.post(
  "/add",
  require("../middleware/auth"),
  require("../controllers/addApplication"),
);

router.get(
  "/get",
  require("../middleware/auth"),
  require("../controllers/getApplications"),
);

module.exports = router;
