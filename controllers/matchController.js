const { Match, Team } = require("../models/");

exports.getAllMatches = async (req, res) => {
  try {
    const matches = await Match.findAll({
      include: [
        { model: Team, as: "homeTeam" },
        { model: Team, as: "awayTeam" },
      ],
    });

    const responseBody = matches.map((match) => ({
      match_id: match.match_id,
      season_id: match.season_id,
      hometeam_id: match.hometeam_id,
      hometeam_name: match.homeTeam.name,
      awayteam_id: match.awayteam_id,
      awayteam_name: match.awayTeam.name,
      stadium: match.stadium,
      date: match.date,
    }));

    res.status(200).json(responseBody);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

exports.getMatchesBySeason = async (req, res) => {
  try {
    const { season_id } = req.params;

    const matches = await Match.findAll({
      where: {
        season_id: season_id,
      },
      include: [
        { model: Team, as: "homeTeam", attributes: ["name"] },
        { model: Team, as: "awayTeam", attributes: ["name"] },
      ],
    });

    const responseBody = matches.map((match) => ({
      match_id: match.match_id,
      season_id: match.season_id,
      hometeam_id: match.hometeam_id,
      hometeam_name: match.homeTeam.name,
      awayteam_id: match.awayteam_id,
      awayteam_name: match.awayTeam.name,
      stadium: match.stadium,
      date: match.date,
    }));

    res.status(200).json(responseBody);
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

    const match = await Match.findByPk(match_id);

    if (!match) {
      return res.status(404).json({
        error: "Match not found.",
      });
    }

    const responseBody = {
      match_id: match.match_id,
      season_id: match.season_id,
      hometeam_id: match.hometeam_id,
      awayteam_id: match.awayteam_id,
      stadium: match.stadium,
      date: match.date,
    };

    res.status(200).json(responseBody);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

exports.createMatch = async (req, res) => {
  try {
    console.log("Creating a new match");
    console.log(req.body);
    const { season_id, hometeam_id, awayteam_id, stadium, date } = req.body;
    if (!season_id || !hometeam_id || !awayteam_id || !stadium || !date) {
      return res.status(400).json({
        error: "Some fields are missing",
      });
    }

    const newMatch = await Match.create({
      season_id,
      hometeam_id,
      awayteam_id,
      stadium,
      date,
    });

    const responseBody = {
      match_id: newMatch.match_id,
      season_id: newMatch.season_id,
      hometeam_id: newMatch.hometeam_id,
      awayteam_id: newMatch.awayteam_id,
      stadium: newMatch.stadium,
      date: newMatch.date,
    };

    res.status(201).json(responseBody);
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

    return res.status(200).json({
      match_id: match.match_id,
      hometeam_id: match.hometeam_id,
      awayteam_id: match.awayteam_id,
      date: match.date,
      stadium: match.stadium,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
