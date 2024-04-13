const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.js");

const TeamStats = sequelize.define(
  "TeamStats",
  {
    teamstats_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    team_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Team",
        key: "team_id",
      },
    },
    season_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Season",
        key: "season_id",
      },
    },
    matches_played: {
      type: DataTypes.INTEGER,
    },
    wins: {
      type: DataTypes.INTEGER,
    },
    draws: {
      type: DataTypes.INTEGER,
    },
    losses: {
      type: DataTypes.INTEGER,
    },
    points: {
      type: DataTypes.INTEGER,
    },
  },
  {
    tableName: "teamstats",
    timestamps: false,
  }
);

module.exports = TeamStats;
