const express = require("express");
const router = express.Router();
const leagueController = require("../controllers/leagueController.js");

router.route("/").get(leagueController.getAllLeagues).post(leagueController.createLeague);

router
  .route("/:id")
  .get(leagueController.getLeagueById)
  .delete(leagueController.deleteLeague)
  .put(leagueController.updateLeague);

module.exports = router;
