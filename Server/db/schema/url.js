const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const URL = new Schema(
  {
    longURL: { type: String, required: true },
    ip: { type: String, required: true },
    shortID: { type: String, required: true },
    click: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("URL", URL);
