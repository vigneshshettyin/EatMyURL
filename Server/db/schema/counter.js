const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const counterSchema = new Schema(
  {
    counter: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Counter", counterSchema);
