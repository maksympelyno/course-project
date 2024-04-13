const { Season } = require("../models");

exports.getAllSeasons = async (req, res) => {
  try {
    const seasons = await Season.findAll();

    const responseBody = seasons.map((season) => ({
      season_id: season.season_id,
      league_id: season.league_id,
      name: season.name,
    }));

    res.status(200).json(responseBody);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

exports.getSeasonById = async (req, res) => {
  try {
    const season_id = req.params.id;
    if (isNaN(season_id)) {
      return res.status(400).json({
        error: "Invalid league ID.",
      });
    }
    const season = await Season.findByPk(season_id);

    if (!season) {
      return res.status(404).json({
        error: "Season not found.",
      });
    }

    const responseBody = {
      season_id: season.season_id,
      league_id: season.league_id,
      name: season.name,
    };

    res.status(200).json(responseBody);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

exports.createSeason = async (req, res) => {
  try {
    const { league_id, name } = req.body;

    if (!league_id || !name) {
      return res.status(400).json({
        error: "Missing required fields.",
      });
    }

    const newSeason = await Season.create(
      {
        league_id,
        name,
      },
      {
        fields: ["league_id", "name"],
      }
    );
    const responseBody = {
      league_id: newSeason.league_id,
      season_id: newSeason.season_id,
      name: newSeason.name,
    };

    res.status(201).json(responseBody);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

exports.deleteSeason = async (req, res) => {
  try {
    const seasonId = req.params.id;

    const season = await Season.findByPk(seasonId);

    if (!season) {
      return res.status(404).json({
        error: "Season not found.",
      });
    }

    await season.destroy();

    res.status(204).json("Successfully deleted");
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

exports.updateSeason = async (req, res) => {
  try {
    const seasonId = req.params.id;
    const { league_id, name } = req.body;

    const season = await Season.findByPk(seasonId);

    if (!season) {
      return res.status(404).json({
        error: "Season not found.",
      });
    }

    season.league_id = league_id;
    season.name = name;

    await season.save();

    res.status(200).json(season);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};
