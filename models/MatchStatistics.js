const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.js");

const MatchStatistics = sequelize.define(
  "MatchStatistics",
  {
    matchstatistics_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    match_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Match",
        key: "match_id",
      },
    },
    hometeam_score: {
      type: DataTypes.INTEGER,
    },
    awayteam_score: {
      type: DataTypes.INTEGER,
    },
    possession: {
      type: DataTypes.DECIMAL(5, 2),
    },
    hometeam_shot: {
      type: DataTypes.INTEGER,
    },
    awayteam_shot: {
      type: DataTypes.INTEGER,
    },
  },
  {
    tableName: "matchstatistics",
    timestamps: false,
  }
);

module.exports = MatchStatistics;
