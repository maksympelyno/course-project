const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const League = sequelize.define(
  "League",
  {
    league_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    country: {
      type: DataTypes.STRING(100),
    },
    name: {
      type: DataTypes.STRING(100),
    },
  },
  {
    tableName: "league", // Вказуємо назву таблиці
    timestamps: false, // Відключаємо таймстемпи
  }
);

module.exports = League;
