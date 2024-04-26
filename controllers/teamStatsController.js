const { Op } = require("sequelize");
const { TeamStats } = require("../models");
const { Season } = require("../models");
const sequelize = require("../config/db.js");
const { QueryTypes } = require("sequelize");

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
async function getTeamStatsAndTable(req, res) {
  try {
    const { seasonId, teamId } = req.query;
    console.log(sequelize);
    const results = await sequelize.query(`SELECT * FROM GetTeamStatsAndTableEntry(${seasonId}, ${teamId})`, {
      type: QueryTypes.SELECT,
    });

    res.json(results);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getTeamStatForChart(req, res) {
  try {
    const { teamChart } = req.query;

    const results = await sequelize.query(`SELECT * FROM get_team_stats_chart('${teamChart}')`, {
      type: QueryTypes.SELECT,
    });

    res.json(results);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
module.exports = {
  getTeamStats,
  getTeamStatsAndTable,
  getTeamStatForChart,
};
