const express = require("express");
const router = express.Router();
const teamStatsController = require("../controllers/teamStatsController");

// Маршрут для отримання статистики команди
router.get("/", teamStatsController.getTeamStatsAndTable);
//router.get("/test", teamStatsController.getTeamStatsAndTable);
module.exports = router;
