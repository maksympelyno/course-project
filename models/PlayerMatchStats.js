const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.js");

const PlayerMatchStats = sequelize.define(
  "PlayerMatchStats",
  {
    playermatchstats_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    playerstats_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "PlayerStats",
        key: "playerstats_id",
      },
    },
    goal: {
      type: DataTypes.INTEGER,
    },
    assist: {
      type: DataTypes.INTEGER,
    },
    yellowcards: {
      type: DataTypes.INTEGER,
    },
    timeonfield: {
      type: DataTypes.INTEGER,
    },
  },
  {
    tableName: "playermatchstats",
    timestamps: false,
  }
);

module.exports = PlayerMatchStats;
