const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("postgresql://postgres:1234@localhost:5432/course");

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Підключено до бази даних");
  } catch (error) {
    console.error("Не вдалося підключитися до бази даних:", error);
  }
})();

module.exports = sequelize;
