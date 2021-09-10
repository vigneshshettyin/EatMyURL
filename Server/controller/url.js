class URL_SHORTNER {
  async testing(req, res) {
    res.redirect("https://google.com");
  }
}

module.exports = new URL_SHORTNER();
