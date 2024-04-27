const LogModel = require("../mongoModels/LogModel");

const logHandler = async (method, role, origin, url) => {
  try {
    await LogModel.create({
      method: method,
      role: role,
      origin: origin,
      url: url,
    });
  } catch (err) {
    console.error("Error logging event to MongoDB", err);
  }
};

const logger = (req, res, next) => {
  logHandler(req.method, req.headers.role, req.headers.origin, req.url);
  next();
};

module.exports = { logger, logHandler };
