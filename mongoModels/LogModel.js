const mongoose = require("mongoose");

const LogSchema = new mongoose.Schema({
  dateTime: { type: Date, default: Date.now },
  method: String,
  role: String,
  origin: String,
  url: String,
});

const LogModel = mongoose.model("Log", LogSchema);

module.exports = LogModel;
