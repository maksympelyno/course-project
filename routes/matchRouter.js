const express = require("express");
const router = express.Router();
const matchController = require("../controllers/matchController.js");

router.route("/").get(matchController.getAllMatches).post(matchController.createMatch);

router
  .route("/:id")
  .get(matchController.getMatchById)
  .delete(matchController.deleteMatch)
  .put(matchController.updateMatch);

router.route("/season/:season_id").get(matchController.getMatchesBySeason);

module.exports = router;
