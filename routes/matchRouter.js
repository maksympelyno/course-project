const express = require("express");
const router = express.Router();
const matchController = require("../controllers/matchController.js");

router.route("/").get(matchController.getAllMatches).post(matchController.createMatch);

router
  .route("/:id")
  .get(matchController.getMatchById)
  .delete(matchController.deleteMatch)
  .put(matchController.updateMatch);

module.exports = router;
