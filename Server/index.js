// Dependencies
require("dotenv").config();
const express = require("express");
const cors = require("cors");
// const apicache = require("apicache");
const rateLimit = require("express-rate-limit").default;
const morgan = require("morgan");
const router = require("./routes");
const Connect = require("./db/connect");
<<<<<<< HEAD:Server/handler.js
const HOST_URL = process.env.CLIENT_URL;
=======

// PORT

const PORT = process.env.PORT || 8000;

>>>>>>> parent of 8d57412 (AWS Serverless):Server/index.js
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
<<<<<<< HEAD:Server/handler.js
        url: process.env.SERVER_URL,
=======
        url: `http://localhost:${PORT}`,
      },
      {
        url: "https://eatmyurl.ml/",
>>>>>>> parent of 8d57412 (AWS Serverless):Server/index.js
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
<<<<<<< HEAD:Server/handler.js
  res.redirect(HOST_URL);
=======
  res.redirect("/api-docs");
>>>>>>> parent of 8d57412 (AWS Serverless):Server/index.js
});

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

app.use(router);

<<<<<<< HEAD:Server/handler.js
if (process.env.STATUS === "prod") {
  module.exports.handler = serverless(app);
} else {
  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
}
=======
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
>>>>>>> parent of 8d57412 (AWS Serverless):Server/index.js
