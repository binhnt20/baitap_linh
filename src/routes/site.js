const router = require("express").Router(),
  siteController = require("../app/controllers/SiteController");

router.get("/logout", siteController.logout);
router.post("/login", siteController.loginHandle);

module.exports = router;
