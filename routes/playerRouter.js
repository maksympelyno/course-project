const express = require("express");
const router = express.Router();
const playerController = require("../controllers/playerController");

// Маршрут для отримання статистики команди
router.get("/", playerController.searchPlayersByNamePart);
//router.get("/test", teamStatsController.getTeamStatsAndTable);
module.exports = router;
