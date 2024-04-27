const express = require("express");
const router = express.Router();
const teamController = require("../controllers/teamController");
const verifyRoles = require("../middleware/verifyRoles");
const ROLES_LIST = require("../config/roles_list.js");

router.get("/", teamController.getTeamsBySeason);
router.get("/loser", verifyRoles(ROLES_LIST.Admin, ROLES_LIST.PremiumUser), teamController.getTeamWithMostLoses);
router.get("/winner", verifyRoles(ROLES_LIST.Admin, ROLES_LIST.PremiumUser), teamController.getTeamWithMostWins);

module.exports = router;
