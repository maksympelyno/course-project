const express = require("express");
const router = express.Router();
const teamStatsController = require("../controllers/teamStatsController");

// Маршрут для отримання статистики команди
router.get("/", teamStatsController.getTeamStats);
router.get("/chart", teamStatsController.getTeamStatForChart);

//router.get("/test", teamStatsController.getTeamStatsAndTable);
module.exports = router;
