const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.js");

const Team = sequelize.define(
  "Team",
  {
    team_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(100),
    },
    league_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "League",
        key: "league_id",
      },
    },
  },
  {
    tableName: "team",
    timestamps: false,
  }
);

module.exports = Team;
