const { Match, Team } = require("../models/");
const sequelize = require("../config/db.js");
const { QueryTypes } = require("sequelize");
exports.getAllMatches = async (req, res) => {
  try {
    let whereClause = {};
    if (req.query.seasonId) {
      whereClause.season_id = req.query.seasonId;
    }

    const matches = await Match.findAll({
      where: whereClause, // Додавання умови пошуку
      include: [
        { model: Team, as: "homeTeam" },
        { model: Team, as: "awayTeam" },
      ],
      order: [["date", "ASC"]],
    });
    res.status(200).json(matches);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

exports.getMatchesWithoutStatistics = async (req, res) => {
  console.log("here chec");
  try {
    const matchesWithoutStatistics = await sequelize.query(
      `SELECT m.match_id,
      home_team.name AS home_team_name, 
      away_team.name AS away_team_name,
      season.name AS season_name
 FROM Match AS m 
LEFT JOIN Team AS home_team ON m.hometeam_id = home_team.team_id 
LEFT JOIN Team AS away_team ON m.awayteam_id = away_team.team_id 
LEFT JOIN Season AS season ON m.season_id = season.season_id
WHERE m.match_id NOT IN 
      (SELECT match_id FROM MatchStatistics)`,
      {
        type: QueryTypes.SELECT,
      }
    );

    res.status(200).json(matchesWithoutStatistics);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

exports.getMatchById = async (req, res) => {
  try {
    const match_id = req.params.id;
    console.log(`Getting match with ID: ${match_id}`);

    if (isNaN(match_id)) {
      return res.status(400).json({
        error: "Invalid match ID.",
      });
    }

    const match = await Match.findByPk(match_id, {
      include: [
        { model: Team, as: "homeTeam", attributes: ["name"] },
        { model: Team, as: "awayTeam", attributes: ["name"] },
      ],
    });

    if (!match) {
      return res.status(404).json({
        error: "Match not found.",
      });
    }

    res.status(200).json(match);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

exports.createMatch = async (req, res) => {
  try {
    const { season_id, hometeam_id, awayteam_id, stadium, date } = req.body;
    if (!season_id || !hometeam_id || !awayteam_id || !stadium || !date) {
      return res.status(400).json({
        error: "Some fields are missing",
      });
    }

    const result = await sequelize.query(`CALL CreateMatch(:season_id, :hometeam_id, :awayteam_id, :stadium, :date)`, {
      replacements: { season_id, hometeam_id, awayteam_id, stadium, date },
    });

    res.status(201).json(result);
  } catch (error) {
    console.error("Error:", error);

    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

exports.deleteMatch = async (req, res) => {
  try {
    const matchId = req.params.id;
    console.log(matchId);
    const match = await Match.findByPk(matchId);

    await match.destroy();

    return res.status(204).json("Successfully deleted");
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.updateMatch = async (req, res) => {
  try {
    const matchId = req.params.id;
    const { season_id, hometeam_id, awayteam_id, stadium, date } = req.body;

    const match = await Match.findByPk(matchId);

    match.season_id = season_id;
    match.hometeam_id = hometeam_id;
    match.awayteam_id = awayteam_id;
    match.stadium = stadium;
    match.date = date;

    await match.save();

    return res.status(200).json(match);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
