const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.js");

const Season = sequelize.define(
  "Season",
  {
    season_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    league_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "League",
        key: "league_id",
      },
    },
    name: {
      type: DataTypes.STRING(100),
    },
  },
  {
    tableName: "season",
    timestamps: false,
  }
);

module.exports = Season;
