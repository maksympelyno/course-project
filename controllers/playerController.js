const { Player, Team } = require("../models"); // Переконайтеся, що шлях правильний
const { Op } = require("sequelize");
exports.searchPlayersByNamePart = async (req, res) => {
  try {
    const { searchTerm } = req.query;
    const players = await Player.findAll({
      where: {
        [Op.or]: [
          { name: { [Op.iLike]: `%${searchTerm}%` } }, // Пошук за ім'ям гравця, ігноруючи регістр
          { "$Team.name$": { [Op.iLike]: `%${searchTerm}%` } }, // Пошук за назвою клубу, ігноруючи регістр
        ],
      },
      include: [{ model: Team, required: true }],
    });
    res.status(200).json(players);
  } catch (error) {
    console.error("Error searching players:", error);
    throw error;
  }
};
