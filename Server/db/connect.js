require("dotenv").config();
const mongoose = require("mongoose");
async function Connect() {
  // Database connection 🥳
  try {
    await mongoose.connect(process.env.DB_CONNECT);
    console.log("MongoDB connected 🤸");
  } catch (error) {
    console.log(`MongoDB Connection Failed 😲`);
  }
}
module.exports = Connect;
