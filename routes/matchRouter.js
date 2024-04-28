const express = require("express");
const router = express.Router();
const matchController = require("../controllers/matchController.js");
const verifyRoles = require("../middleware/verifyRoles");
const ROLES_LIST = require("../config/roles_list.js");

router.route("/").get(matchController.getAllMatches).post(verifyRoles(ROLES_LIST.Admin), matchController.createMatch);

router.route("/fetch-pdf").get(matchController.fetchPdfWithMatches);
router.route("/create-pdf").post(matchController.createPdfWithMatches);

router.route("/fetch-json").get(matchController.fetchJsonWithMatches);
router.route("/create-json").post(matchController.createJsonWithMatches);

router.route("/withoutStats").get(verifyRoles(ROLES_LIST.Admin), matchController.getMatchesWithoutStatistics);

router
  .route("/:id")
  .get(matchController.getMatchById)
  .delete(verifyRoles(ROLES_LIST.Admin), matchController.deleteMatch)
  .put(verifyRoles(ROLES_LIST.Admin), matchController.updateMatch);

module.exports = router;
