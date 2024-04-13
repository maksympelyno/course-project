const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.js");

const Match = sequelize.define(
  "Match",
  {
    match_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    season_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Season",
        key: "season_id",
      },
    },
    hometeam_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Team",
        key: "team_id",
      },
    },
    awayteam_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Team",
        key: "team_id",
      },
    },
    stadium: {
      type: DataTypes.STRING(100),
    },
    date: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: "match",
    timestamps: false,
  }
);

module.exports = Match;
