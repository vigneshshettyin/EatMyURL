const base62 = require("./base62/base62");
const Counter = require("../db/schema/counter");
const URL = require("../db/schema/url");
const validator = require("validator");

async function getShortCode() {
  const response = await Counter.findOne({
    _id: process.env.COUNTER_ID,
  });
  return base62.encode(response.counter);
}

function getHost(req) {
  return req.protocol + "://" + req.get("host") + "/";
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
    var { url } = req.body;
    if (!validator.isURL(url)) {
      return res.status(400).json({
        error: "Invalid URL!",
      });
    }
    if (!!url.includes("https")) {
      let stringLength = url.length;
      url = url.substring(8, stringLength);
    }
    if (!url.includes("http")) {
      url = req.protocol + "://" + url;
    }
    const myArr = url.split(getHost(req));
    if (myArr.length > 2) {
      return res.status(400).json({
        error: "Invalid URL!",
      });
    }
    const response = await URL.findOne({
      shortID: myArr[1],
    });
    if (!response) {
      return res.status(404).json({
        error: "URL not found!",
      });
    }
    res.status(200).json(response);
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
}

module.exports = new URL_SHORTENER();
