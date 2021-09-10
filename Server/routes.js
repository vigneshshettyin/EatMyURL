const router = require("express").Router();
const URL_SHORTNER = require("./controller/url");
const multer = require("multer");
const upload = multer();

router.get("/:shortID", URL_SHORTNER.redirect);

router.post("/api/new", upload.none(), URL_SHORTNER.shorten);

router.get("/api/click", upload.none(), URL_SHORTNER.getClickCount);

module.exports = router;
