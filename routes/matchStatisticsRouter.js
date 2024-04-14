const express = require("express");
const router = express.Router();
const matchStatisticsController = require("../controllers/matchStatisticsController");

router
  .route("/")
  .get(matchStatisticsController.getMatchStatistics)
  .post(matchStatisticsController.createMatchStatistics);

router
  .route("/:matchId")
  .put(matchStatisticsController.updateMatchStatistics)
  .delete(matchStatisticsController.deleteMatchStatistics);

module.exports = router;
