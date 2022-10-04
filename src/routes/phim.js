const router = require("express").Router(),
  phimController = require("../app/controllers/PhimController");

router.get("/list", phimController.listPhim);
router.get("/:slug", phimController.showPhim);

module.exports = router;
