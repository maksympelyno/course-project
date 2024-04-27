const express = require("express");
const router = express.Router();
const matchStatisticsController = require("../controllers/matchStatisticsController");
const verifyRoles = require("../middleware/verifyRoles");
const ROLES_LIST = require("../config/roles_list.js");

router
  .route("/")
  .get(matchStatisticsController.getMatchStatistics)
  .post(verifyRoles(ROLES_LIST.Admin), matchStatisticsController.createMatchStatistics);

router
  .route("/:matchStatId")
  .put(verifyRoles(ROLES_LIST.Admin), matchStatisticsController.updateMatchStatistics)
  .delete(verifyRoles(ROLES_LIST.Admin), matchStatisticsController.deleteMatchStatistics);

module.exports = router;
