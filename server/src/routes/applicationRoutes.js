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
  "/updateStatus/:id",
  require("../middleware/auth"),
  require("../controllers/applicationManipulation").updateApplicationStatus,
);

router.delete(
  "/delete/:id",
  require("../middleware/auth"),
  require("../controllers/applicationManipulation").deleteApplication,
);

router.patch(
  "/editApplication/:id",
  require("../middleware/auth"),
  require("../controllers/applicationManipulation").editApplication,
);

module.exports = router;
