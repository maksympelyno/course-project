const express = require("express");
const router = express.Router();
const leagueController = require("../controllers/leagueController.js");
const verifyRoles = require("../middleware/verifyRoles");
const ROLES_LIST = require("../config/roles_list.js");
router
  .route("/")
  .get(leagueController.getAllLeagues)
  .post(verifyRoles(ROLES_LIST.Admin), leagueController.createLeague);

router
  .route("/:id")
  .get(leagueController.getLeagueById)
  .delete(verifyRoles(ROLES_LIST.Admin), leagueController.deleteLeague)
  .put(verifyRoles(ROLES_LIST.Admin), leagueController.updateLeague);

module.exports = router;
