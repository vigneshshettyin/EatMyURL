const serverless = require("serverless-http");
// Dependencies
require("dotenv").config();
const express = require("express");
const cors = require("cors");
// const apicache = require("apicache");
const rateLimit = require("express-rate-limit").default;
const morgan = require("morgan");
const router = require("./routes");
const Connect = require("./db/connect");
const HOST_URL = "https://app.eurl.tech";
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
        url: "https://eurl.tech",
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

app.use(cors());

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
  res.redirect(HOST_URL);
});

app.get("testing-api", (req, res) => {
  res.status(200).json({
    message: "Testing API",
    status: 200,
  });
});

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

app.use(router);

module.exports.handler = serverless(app);
