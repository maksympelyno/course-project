const express = require("express");
const cors = require("cors");
const app = express();

const sequelize = require("./config/db.js");
const leagueRouter = require("./routes/leagueRouter.js");
const matchRouter = require("./routes/matchRouter.js");
const teamStatsRouter = require("./routes/teamStatsRouter.js");
const matchStatisticsRouter = require("./routes/matchStatisticsRouter.js");
const seasonRouter = require("./routes/seasonRouter.js");

app.use(express.json());
app.use(cors());

sequelize.sync();

app.use("/league", leagueRouter);
app.use("/match", matchRouter);
app.use("/team-stats", teamStatsRouter);
app.use("/match-stats", matchStatisticsRouter);
app.use("/season", seasonRouter);

module.exports = app;
