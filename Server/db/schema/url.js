const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const URLschema = new Schema(
  {
    longURL: { type: String, required: true },
    ip: { type: String, required: true },
    shortID: { type: String, required: true },
    click: { type: Number, default: 0 },
  
  },
  { timestamps: true }
);
const URL = mongoose.model("URL", URLschema);
module.exports = URL;
