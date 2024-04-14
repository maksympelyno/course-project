const express = require("express");
const router = express.Router();
const teamStatsController = require("../controllers/teamStatsController");

// Маршрут для отримання статистики команди
router.get("/", teamStatsController.getTeamStats);

module.exports = router;
