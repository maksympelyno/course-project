const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.js");

const TableEntry = sequelize.define(
  "TableEntry",
  {
    tableentry_id: {
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
    team_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Team",
        key: "team_id",
      },
    },
    place: {
      type: DataTypes.INTEGER,
    },
  },
  {
    tableName: "tableentry",
    timestamps: false,
  }
);

module.exports = TableEntry;
