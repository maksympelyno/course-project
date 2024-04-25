const MatchStatistics = require("../models/MatchStatistics");

exports.getMatchStatistics = async (req, res) => {
  try {
    const { matchId } = req.query;

    if (!matchId) {
      return res.status(400).json({ error: "Match ID is required" });
    }

    const matchStatistics = await MatchStatistics.findAll({
      where: { match_id: matchId },
    });

    if (!matchStatistics) {
      return res.status(404).json({ error: "Match statistics not found" });
    }

    res.status(200).json(matchStatistics);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.createMatchStatistics = async (req, res) => {
  try {
    const { matchId, homeTeamScore, awayTeamScore, possession, homeTeamShot, awayTeamShot } = req.body;
    if (!matchId || !homeTeamScore || !awayTeamScore || !possession || !homeTeamShot || !awayTeamShot) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newMatchStatistics = await MatchStatistics.create({
      match_id: matchId,
      hometeam_score: homeTeamScore,
      awayteam_score: awayTeamScore,
      possession: possession,
      hometeam_shot: homeTeamShot,
      awayteam_shot: awayTeamShot,
    });
    res.status(201).json(newMatchStatistics);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updateMatchStatistics = async (req, res) => {
  try {
    const { matchStatId } = req.params;
    const { match_id, hometeam_score, awayteam_score, possession, hometeam_shot, awayteam_shot } = req.body;

    if (!matchStatId || !hometeam_score || !awayteam_score || !possession || !hometeam_shot || !awayteam_shot) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const matchStatistics = await MatchStatistics.findByPk(matchStatId);

    if (!matchStatistics) {
      return res.status(404).json({ error: "Match statistics not found" });
    }

    await matchStatistics.update({
      match_id,
      hometeam_score,
      awayteam_score,
      possession,
      hometeam_shot,
      awayteam_shot,
    });

    res.status(200).json(matchStatistics);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.deleteMatchStatistics = async (req, res) => {
  try {
    const { matchId } = req.params;

    if (!matchId) {
      return res.status(400).json({ error: "Match ID is required" });
    }

    const matchStatistics = await MatchStatistics.findByPk(matchId);

    if (!matchStatistics) {
      return res.status(404).json({ error: "Match statistics not found" });
    }

    await matchStatistics.destroy();

    res.status(200).json({ message: "Match statistics deleted successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
