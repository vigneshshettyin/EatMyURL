// Dependencies
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const router = require("./routes");
const connectDB = require("./db/connect");
connectDB();
// Port
const PORT = process.env.PORT || 5000;

const app = express();
// Connecting to MongoDB
// Cors Setup
const corsOption = {
  credentials: true,
  origin: ["http://localhost:3000"],
};
app.use(cors(corsOption));

app.get("/", (req, res) => {
  res.redirect(process.env["URL_REDIRECT"]);
});

app.use(router);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
