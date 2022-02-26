// Dependencies
require("dotenv").config();
const express = require("express");
const cors = require("cors");
// const apicache = require("apicache");
const rateLimit = require("express-rate-limit").default;
const morgan = require("morgan");
const router = require("./routes");
const Connect = require("./db/connect");

// PORT

const PORT = process.env.PORT || 8000;

// Swagger Docs

const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "EatMyURL API",
      version: "2.0.0",
      description:
        "Free URL Shortener & API. Shorten and replace long URL to short link. Track your links. Use it to affiliate programs, ads, social websites, emails, text messages.",
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
      },
      {
        url: process.env.SERVER_URL,
      },
    ],
  },
  apis: ["./routes.js"],
};

const specs = swaggerJsDoc(options);

Connect();
// Port

const app = express();

app.use(express.json());

app.use(morgan("tiny"));

// Connecting to MongoDB
// Cors Setup
const corsOption = {
  credentials: true,
  origin: ["http://localhost:3000", "http://localhost:8000"],
};
app.use(cors(corsOption));

// Cache Setup

// let cache = apicache.middleware;

// app.use(cache("5 minutes"));

// Rate Limiter Setup

// Create the rate limit rule
const apiRequestLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 60, // limit each IP to 2 requests per windowMs
});

// Use the limit rule as an application middleware
app.use(apiRequestLimiter);

// Revoked in Version 2.0.0

app.get("/", (req, res) => {
  res.redirect(process.env.CLIENT_URL);
});

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

app.use(router);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
