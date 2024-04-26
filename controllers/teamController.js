const sequelize = require("../config/db.js");
const { QueryTypes } = require("sequelize");

exports.getTeamsBySeason = async (req, res) => {
  try {
    const { seasonId } = req.query;
    const results = await sequelize.query(`SELECT * FROM GetTeamsBySeasonId(${seasonId})`, {
      type: QueryTypes.SELECT,
    });

    res.json(results);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getTeamWithMostLoses = async (req, res) => {
  try {
    const results = await sequelize.query(`SELECT * FROM find_team_with_most_losses()`, {
      type: QueryTypes.SELECT,
    });
    res.json(results);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getTeamWithMostWins = async (req, res) => {
  try {
    const results = await sequelize.query(`SELECT * FROM find_team_with_most_wins()`, {
      type: QueryTypes.SELECT,
    });
    res.json(results);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
