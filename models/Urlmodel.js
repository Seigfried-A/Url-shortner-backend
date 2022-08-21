const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
  nano_id: String,
  longUrl: {
    type: String,
    required: true,
  },
  shortUrl: String,
  date: {
    type: String,
    default: Date.now,
  },
});

module.exports = mongoose.model("Url", urlSchema);
