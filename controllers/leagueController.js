const { League } = require("../models/");

exports.getAllLeagues = async (req, res) => {
  try {
    const leagues = await League.findAll();

    const responseBody = leagues.map((league) => ({
      league_id: league.league_id,
      country: league.country,
      name: league.name,
    }));

    res.status(200).json(responseBody);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      body: {
        status: "error",
        message: "Internal Server Error",
      },
    });
  }
};

exports.getLeagueById = async (req, res) => {
  try {
    const league_id = req.params.id;
    console.log(`Getting league with ID: ${league_id}`);

    if (isNaN(league_id)) {
      return res.status(400).json({
        error: "Invalid league ID.",
      });
    }

    const league = await League.findByPk(league_id);

    if (!league) {
      return res.status(404).json({
        error: "League not found.",
      });
    }
    const responseBody = {
      league_id: league.league_id,
      country: league.country,
      name: league.name,
    };

    res.status(200).json(responseBody);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

exports.createLeague = async (req, res) => {
  try {
    console.log("Creating a new league");
    console.log(req.body);
    const { country, name } = req.body;
    if (!country || !name) {
      return res.status(400).json({
        error: "Something is missing",
      });
    }

    const newLeague = await League.create(
      {
        country,
        name,
      },
      {
        fields: ["country", "name"],
      }
    );

    const responseBody = {
      league_id: newLeague.league_id,
      country: newLeague.country,
      name: newLeague.name,
    };

    res.status(201).json(responseBody);
  } catch (error) {
    console.error("Error:", error);

    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

exports.deleteLeague = async (req, res) => {
  try {
    const leagueId = req.params.id;
    console.log(leagueId);
    const league = await League.findByPk(leagueId);

    await league.destroy();

    return res.status(204).json("Successfully deleted");
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.updateLeague = async (req, res) => {
  try {
    const leagueId = req.params.id;
    const { name, country } = req.body;

    const league = await League.findByPk(leagueId);

    league.name = name;
    league.country = country;

    await league.save();

    return res.status(200).json({
      league_id: league.league_id,
      name: league.name,
      country: league.country,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
