// Dependencies
require("dotenv").config();
const express = require("express");
const cors = require("cors");
// const apicache = require("apicache");
const rateLimit = require("express-rate-limit").default;
const morgan = require("morgan");
const router = require("./routes");
const Connect = require("./db/connect");
Connect();
// Port
const PORT = process.env.PORT || 6000;

const app = express();

app.use(morgan("tiny"));

// Connecting to MongoDB
// Cors Setup
const corsOption = {
  credentials: true,
  origin: ["http://localhost:3000"],
};
app.use(cors(corsOption));

// Cache Setup

// let cache = apicache.middleware;

// app.use(cache("5 minutes"));

// Rate Limiter Setup

// Create the rate limit rule
const apiRequestLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 10, // limit each IP to 2 requests per windowMs
});

// Use the limit rule as an application middleware
app.use(apiRequestLimiter);

app.get("/", (req, res) => {
  res.redirect(process.env["URL_REDIRECT"]);
});

app.use(router);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
