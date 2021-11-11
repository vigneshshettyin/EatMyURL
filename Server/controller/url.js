const base62 = require("./base62/base62");
const Counter = require("../db/schema/counter");
const URL = require("../db/schema/url");
const validator = require("validator");
const url2 = require("url");

async function getShortCode() {
  const response = await Counter.findOne({
    _id: process.env.COUNTER_ID,
  });
  return base62.encode(response.counter);
}

function getHost(req) {
  return "https" + "://" + req.get("host") + "/";
}

async function updateCounter() {
  const response = await Counter.findOne({
    _id: process.env.COUNTER_ID,
  });
  response.counter = response.counter + 1;
  await response.save();
}

async function updateClicks(shortID) {
  const response = await URL.findOne({
    shortID: shortID,
  });
  response.click = response.click + 1;
  await response.save();
}

class URL_SHORTENER {
  async redirect(req, res) {
    const { shortID } = req.params;
    if (!shortID) {
      return res.redirect(process.env.URL_REDIRECT);
    }
    const response = await URL.findOne({
      shortID: shortID,
    });
    if (!response) {
      return res.redirect(process.env.URL_REDIRECT);
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
    const { url } = req.body;
    if (!validator.isURL(url)) {
      return res.status(400).json({
        error: "Invalid URL!",
      });
    }
    const newURL = new URL({
      shortID: await getShortCode(),
      longURL: url,
    });
    await updateCounter();
    const response = await newURL.save();
    response.shortID = getHost(req) + response.shortID;
    res.status(200).json(response);
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
      const newURL = new URL({
        shortID: shortID,
        longURL: url,
      });
      await updateCounter();
      const response = await newURL.save();
      response.shortID = getHost(req) + response.shortID;
      res.status(200).json(response);
    }
  }
}

module.exports = new URL_SHORTENER();
