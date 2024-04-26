// const Match = require("./Match");
// const Team = require("./Team");

// // Define associations
// Match.belongsTo(Team, { foreignKey: "hometeam_id", as: "homeTeam" });
// Match.belongsTo(Team, { foreignKey: "awayteam_id", as: "awayTeam" });

// module.exports = { Match, Team };

// In your association file, for example associations.js
const Match = require("./Match");
const League = require("./League");
const Player = require("./Player");
const PlayerMatchStats = require("./PlayerMatchStats");
const PlayerStats = require("./PlayerStats");
const Season = require("./Season");
const TableEntry = require("./TableEntry");
const Team = require("./Team");
const TeamStats = require("./TeamStats");
const MatchStatistics = require("./MatchStatistics");

Match.belongsTo(Team, { foreignKey: "hometeam_id", as: "homeTeam" });
Match.belongsTo(Team, { foreignKey: "awayteam_id", as: "awayTeam" });
// Define associations
League.hasMany(Season, { foreignKey: "league_id" });
Season.belongsTo(League, { foreignKey: "league_id" });

Season.hasMany(Match, { foreignKey: "season_id" });
Match.belongsTo(Season, { foreignKey: "season_id", as: "season" });

Team.hasMany(Player, { foreignKey: "team_id" });
Player.belongsTo(Team, { foreignKey: "team_id" });

Match.hasMany(MatchStatistics, { foreignKey: "match_id" });
MatchStatistics.belongsTo(Match, { foreignKey: "match_id" });

Player.hasMany(PlayerStats, { foreignKey: "player_id" });
PlayerStats.belongsTo(Player, { foreignKey: "player_id" });

Match.hasMany(PlayerStats, { foreignKey: "match_id" });
PlayerStats.belongsTo(Match, { foreignKey: "match_id" });

PlayerStats.hasMany(PlayerMatchStats, { foreignKey: "playerstats_id" });
PlayerMatchStats.belongsTo(PlayerStats, { foreignKey: "playerstats_id" });

Team.hasMany(TeamStats, { foreignKey: "team_id" });
TeamStats.belongsTo(Team, { foreignKey: "team_id" });

Season.hasMany(TeamStats, { foreignKey: "season_id" });
TeamStats.belongsTo(Season, { foreignKey: "season_id" });

Team.hasMany(TableEntry, { foreignKey: "team_id" });
TableEntry.belongsTo(Team, { foreignKey: "team_id" });

Season.hasMany(TableEntry, { foreignKey: "season_id" });
TableEntry.belongsTo(Season, { foreignKey: "season_id" });

module.exports = {
  Match,
  League,
  Player,
  PlayerMatchStats,
  PlayerStats,
  Season,
  TableEntry,
  Team,
  TeamStats,
  MatchStatistics,
};
