const { logHandler } = require("./logger.js");

const errorHandler = (err, req, res, next) => {
  logHandler(`${err.name}: ${err.message}`, "errLog.txt");
  res.status(500).send(err.message);
};

module.exports = errorHandler;
