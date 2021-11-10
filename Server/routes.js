const router = require("express").Router();
const URL_SHORTENER = require("./controller/url");
const multer = require("multer");
const upload = multer();

router.get("/:shortID", URL_SHORTENER.redirect);

router.post("/api/new", upload.none(), URL_SHORTENER.shorten);

router.post("/api/new-custom", upload.none(), URL_SHORTENER.customShorten);

router.post("/api/click", upload.none(), URL_SHORTENER.getClickCount);

module.exports = router;
