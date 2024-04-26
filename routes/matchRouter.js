const express = require("express");
const router = express.Router();
const matchController = require("../controllers/matchController.js");

router.route("/").get(matchController.getAllMatches).post(matchController.createMatch);

router.route("/fetch-pdf").get(matchController.fetchPdfWithMatches);
router.route("/create-pdf").post(matchController.createPdfWithMatches);

router.route("/fetch-json").get(matchController.fetchJsonWithMatches);
router.route("/create-json").post(matchController.createJsonWithMatches);

router.route("/withoutStats").get(matchController.getMatchesWithoutStatistics);

router
  .route("/:id")
  .get(matchController.getMatchById)
  .delete(matchController.deleteMatch)
  .put(matchController.updateMatch);

module.exports = router;
