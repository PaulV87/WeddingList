const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  request: { type: String },
});

const Request = mongoose.model("request", requestSchema);

module.exports = Request;
