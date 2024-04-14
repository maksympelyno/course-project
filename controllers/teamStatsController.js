const { Op } = require("sequelize");
const { TeamStats } = require("../models");
const { Season } = require("../models");

async function getTeamStats(req, res) {
  try {
    const { teamId, seasonId } = req.query;

    let whereCondition = {};

    if (teamId) {
      whereCondition.team_id = teamId;
    }
    if (seasonId) {
      whereCondition.season_id = seasonId;
    }

    const teamStats = await TeamStats.findAll({
      where: whereCondition,
      include: [{ model: Season, as: "Season", attributes: ["name"] }],
    });

    res.json(teamStats);
  } catch (error) {
    console.error("Error fetching team stats:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  getTeamStats,
};
