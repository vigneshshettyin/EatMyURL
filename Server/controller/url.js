const base62 = require("./base62/base62");
const { v4: uuidv4 } = require("uuid");
const shortid = require("shortid");
// Revoked in Version 2.0.0
// const Counter = require("../db/schema/counter");
require("dotenv").config();
const URL = require("../db/schema/url");
const validator = require("validator");
const url2 = require("url");

// Revoked in Version 2.0.0

// async function getShortCode() {
//   const response = await Counter.findOne({
//     _id: process.env.COUNTER_ID,
//   });
//   return base62.encode(response.counter);
// }

// Revoked in Version 2.0.1

async function getShortCode() {
  return base62.encode(`${Date.now()}`);
}

function getHost(req) {
  return "https" + "://" + req.get("host") + "/";
}

// Revoked in Version 2.0.0

// async function updateCounter() {
//   const response = await Counter.findOne({
//     _id: process.env.COUNTER_ID,
//   });
//   response.counter = response.counter + 1;
//   await response.save();
// }

async function updateClicks(shortID) {
  const respone = await URL.findOneAndUpdate(
    { shortID: shortID },
    { $inc: { click: 1 } }
  );
}

class URL_SHORTENER {
  async getStats(req, res) {
    const response = await URL.find();
    if (!response) {
      return res.status(400).json({
        error: "No URLs found!",
      });
    }
    res.status(200).json({
      clientURL: process.env.CLIENT_URL,
      serverURL: process.env.SERVER_URL,
      total: response.length,
      stats: response.map((url) => {
        return {
          createdAt: url.createdAt,
          updatedAt: url.updatedAt,
          click: url.click,
        };
      }),
    });
  }

  async redirect(req, res) {
    const { shortID } = req.params;
    if (!shortID) {
      return res.redirect(process.env.CLIENT_URL);
    }
    const response = await URL.findOne({
      shortID: shortID,
    });
    if (!response) {
      return res.redirect(process.env.CLIENT_URL);
    }
    await updateClicks(shortID);
    if (response.longURL.includes("http")) {
      return res.redirect(response.longURL);
    } else {
      return res.redirect("https://" + response.longURL);
    }
  }

  async getClickCount(req, res) {
    const { url } = req.body;
    if (!validator.isURL(url)) {
      return res.status(400).json({
        error: "Invalid URL!",
      });
    }
    const myURL = new url2.URL(url);
    console.log(myURL.pathname.slice(1));
    const response = await URL.findOne({
      shortID: myURL.pathname.slice(1),
    });
    if (!response) {
      return res.status(400).json({
        error: "Invalid URL!",
      });
    }
    return res.status(200).json(response);
  }

  async shorten(req, res) {
    console.log(req.user);
    const { url } = req.body;
    if (!validator.isURL(url)) {
      return res.status(400).json({
        error: "Invalid URL!",
      });
    }

    const checkForURL = await URL.findOne({
      longURL: url,
    });
    if (!!checkForURL) {
      checkForURL.shortID = getHost(req) + checkForURL.shortID;
      return res.status(200).json(checkForURL);
    } else {
      // const createShortLink = new URL({
      //   shortID: await getShortCode(),
      //   longURL: url,
      //   ip: req.ip,
      // });
      const createShortLink = new URL({
        shortID: await getShortCode(),
        longURL: url,
        ip: req.ip,
      });
      const response = await createShortLink.save();
      const newentry = await URL.findById({ _id: response._id }).findOne({
        _id: response._id,
      });

      newentry.shortID = getHost(req) + newentry.shortID;
      res.status(200).json(newentry);
    }

    // Revoked in Version - 2.0.1
    // const newURL = new URL({
    //   shortID: await getShortCode(),
    //   longURL: url,
    // });
    // Revoked in Version - 2.0.0
    // await updateCounter();
    // Revoked in Version - 2.0.1
    // const response = await newURL.save();
    // response.shortID = getHost(req) + response.shortID;
    // res.status(200).json(response);
  }

  async customShorten(req, res) {
    const { url, shortID } = req.body;
    if (
      !validator.isURL(url) ||
      !shortID ||
      !validator.isAlphanumeric(shortID)
    ) {
      return res.status(400).json({
        error: "Not able to proccess this request!",
      });
    }

    const response = await URL.findOne({
      shortID: shortID,
    });
    if (response) {
      return res.status(400).json({
        error: "Short ID already exists!",
      });
    } else {
      // const newURL = new URL({
      //   shortID: shortID,
      //   longURL: url,
      //   ip: req.ip,
      // });
      //new API
      console.log(req.user);
      const newURL = new URL({
        shortID: shortID,
        longURL: url,
        ip: req.ip,
      });
      // Revoked in Version - 2.0.0
      // await updateCounter();
      const response = await newURL.save();
      response.shortID = getHost(req) + response.shortID;
      res.status(200).json(response);
    }
  }
}

module.exports = new URL_SHORTENER();
