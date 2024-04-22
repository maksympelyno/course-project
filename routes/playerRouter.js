const express = require("express");
const router = express.Router();
const verifyRoles = require("../middleware/verifyRoles");
const ROLES_LIST = require("../config/roles_list.js");
const playerController = require("../controllers/playerController");

// Маршрут для отримання статистики команди
router.get("/", verifyRoles(ROLES_LIST.Admin, ROLES_LIST.PremiumUser), playerController.searchPlayersByNamePart);
//router.get("/test", teamStatsController.getTeamStatsAndTable);
module.exports = router;
