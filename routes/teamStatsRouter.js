const express = require("express");
const router = express.Router();
const teamStatsController = require("../controllers/teamStatsController");
const verifyRoles = require("../middleware/verifyRoles");
const ROLES_LIST = require("../config/roles_list.js");

router.get("/", teamStatsController.getTeamStats);
router.get("/chart", verifyRoles(ROLES_LIST.Admin, ROLES_LIST.PremiumUser), teamStatsController.getTeamStatForChart);

module.exports = router;
