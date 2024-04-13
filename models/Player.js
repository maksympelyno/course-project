const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.js");

const Player = sequelize.define(
  "Player",
  {
    player_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    position: {
      type: DataTypes.STRING(100),
    },
    name: {
      type: DataTypes.STRING(100),
    },
    team_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Team",
        key: "team_id",
      },
    },
  },
  {
    tableName: "player",
    timestamps: false,
  }
);

module.exports = Player;
