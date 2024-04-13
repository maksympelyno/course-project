const express = require("express");
const cors = require("cors");
const app = express();

const sequelize = require("./config/db.js");
const leagueRouter = require("./routes/leagueRouter.js");
const matchRouter = require("./routes/matchRouter.js");

app.use(express.json());
app.use(cors());

sequelize.sync();

app.use("/league", leagueRouter);
app.use("/match", matchRouter);

module.exports = app;
