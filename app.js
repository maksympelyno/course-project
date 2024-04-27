const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

const { logger } = require("./middleware/logger.js");

const sequelize = require("./config/db.js");
const leagueRouter = require("./routes/leagueRouter.js");
const matchRouter = require("./routes/matchRouter.js");
const teamStatsRouter = require("./routes/teamStatsRouter.js");
const matchStatisticsRouter = require("./routes/matchStatisticsRouter.js");
const seasonRouter = require("./routes/seasonRouter.js");
const playerRouter = require("./routes/playerRouter.js");
const teamRouter = require("./routes/teaamRouter.js");

// const accessLogStream = fs.createWriteStream(path.join(__dirname, "access.log"), { flags: "a" });

// // Middleware для отримання ролі користувача з заголовка
// morgan.token("role", function (req) {
//   return req.headers.role;
// });

// // Налаштування логера для запису в файл з додатковою інформацією про роль користувача
// app.use(
//   morgan(
//     ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" Role=:role',
//     { stream: accessLogStream }
//   )
// );

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

sequelize.sync();
app.use(logger);
app.use("/league", leagueRouter);
app.use("/match", matchRouter);
app.use("/team-stats", teamStatsRouter);
app.use("/match-stats", matchStatisticsRouter);
app.use("/season", seasonRouter);
app.use("/search", playerRouter);
app.use("/team", teamRouter);

module.exports = app;
