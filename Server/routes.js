const router = require("express").Router();
const URL_SHORTENER = require("./controller/url");
const multer = require("multer");
const upload = multer();

/**
 * @swagger
 * components:
 *   schemas:
 *     URL:
 *       type: object
 *       required:
 *         - longURL
 *         - shortID
 *       properties:
 *         longURL:
 *           type: string
 *           description: The long URL to be shortened
 *         shortID:
 *           type: string
 *           description: The short ID corresponding to the long URL
 *         click:
 *           type: number
 *           description: The number of times the link has been clicked
 *       example:
 *         longURL: https://blog.vigneshcodes.in/quick-guide-to-deploy-using-docker
 *         shortID: 15FTKq
 *         click: 2
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     URL-SHORTENER:
 *       type: object
 *       required:
 *         - longURL
 *         - shortID
 *       properties:
 *         longURL:
 *           type: string
 *           description: The long URL to be shortened
 *         shortID:
 *           type: string
 *           description: The short ID corresponding to the long URL
 *         click:
 *           type: number
 *           description: The number of times the link has been clicked
 *       example:
 *         longURL: https://blog.vigneshcodes.in/quick-guide-to-deploy-using-docker
 *         shortID: 15FTKq
 *         click: 2
 */

/**
 * @swagger
 * tags:
 *   name: EatMyURL
 *   description: API Docs
 */

router.get("/:shortID", URL_SHORTENER.redirect);

/**
 * @swagger
 * /api/new:
 *   post:
 *     summary: Create a short link
 *     tags: [EatMyURL]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/URL'
 *     responses:
 *       200:
 *         description: The book was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/URL'
 *       500:
 *         description: Some server error
 */

router.post("/api/new", upload.none(), URL_SHORTENER.shorten);

router.post("/api/new-custom", upload.none(), URL_SHORTENER.customShorten);

router.post("/api/click", upload.none(), URL_SHORTENER.getClickCount);

module.exports = router;
