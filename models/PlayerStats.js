const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.js");

const PlayerStats = sequelize.define(
  "PlayerStats",
  {
    playerstats_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    player_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Player",
        key: "player_id",
      },
    },
    match_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Match",
        key: "match_id",
      },
    },
  },
  {
    tableName: "playerstats",
    timestamps: false,
  }
);

module.exports = PlayerStats;
