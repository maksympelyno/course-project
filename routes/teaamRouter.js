const express = require("express");
const router = express.Router();
const teamController = require("../controllers/teamController");

router.get("/", teamController.getTeamsBySeason);
router.get("/loser", teamController.getTeamWithMostLoses);
router.get("/winner", teamController.getTeamWithMostWins);

module.exports = router;
