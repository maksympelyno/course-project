const express = require("express");
const router = express.Router();
const seasonController = require("../controllers/seasonController.js");

router.route("/").get(seasonController.getAllSeasons).post(seasonController.createSeason);

router
  .route("/:id")
  .get(seasonController.getSeasonById)
  .delete(seasonController.deleteSeason)
  .put(seasonController.updateSeason);

module.exports = router;
