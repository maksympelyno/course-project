const express = require("express");
const router = express.Router();
const seasonController = require("../controllers/seasonController.js");
const verifyRoles = require("../middleware/verifyRoles");
const ROLES_LIST = require("../config/roles_list.js");

router
  .route("/")
  .get(seasonController.getAllSeasons)
  .post(verifyRoles(ROLES_LIST.Admin), seasonController.createSeason);

router
  .route("/:id")
  .get(seasonController.getSeasonById)
  .delete(verifyRoles(ROLES_LIST.Admin), seasonController.deleteSeason)
  .put(verifyRoles(ROLES_LIST.Admin), seasonController.updateSeason);

module.exports = router;
