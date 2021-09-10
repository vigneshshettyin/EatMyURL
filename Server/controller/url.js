const base62 = require("./base62/base62");
class URL_SHORTNER {
  async testing(req, res) {
    const counter = 1000000000;
    return res.send(base62.encode(counter));
  }
}

module.exports = new URL_SHORTNER();
