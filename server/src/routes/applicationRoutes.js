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

router.patch(
  "/update/:id",
  require("../middleware/auth"),
  require("../controllers/updateApplication").updateApplicationStatus,
);

router.delete(
  "/delete/:id",
  require("../middleware/auth"),
  require("../controllers/updateApplication").deleteApplication,
);

module.exports = router;
