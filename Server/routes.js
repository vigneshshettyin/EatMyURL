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
 *         _id:
 *           type: string
 *           description: A auto-generated ID default by MongoDB
 *         createdAt:
 *           type: string
 *           description: The date and time the URL was created
 *         updatedAt:
 *           type: string
 *           description: The date and time the URL was updated
 *       example:
 *         longURL: https://blog.vigneshcodes.in/quick-guide-to-deploy-using-docker
 *         shortID: 15FTKq
 *         click: 2
 *         _id: 5f0f8f9f9f9f9f9f9f9f9f9
 *         createdAt: 2020-05-28T10:53:37.000Z
 *         updatedAt: 2020-05-28T10:53:37.000Z
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CREATE_URL:
 *       type: object
 *       required:
 *         - url
 *       properties:
 *         url:
 *           type: string
 *           description: The long URL to be shortened
 *       example:
 *         url: https://blog.vigneshcodes.in/quick-guide-to-deploy-using-docker
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
 *             $ref: '#/components/schemas/CREATE_URL'
 *     responses:
 *       200:
 *         description: The short link has been created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/URL'
 *       500:
 *         description: Some server error
 *
 */

router.post("/api/new", upload.none(), URL_SHORTENER.shorten);

router.post("/api/new-custom", upload.none(), URL_SHORTENER.customShorten);

router.post("/api/click", upload.none(), URL_SHORTENER.getClickCount);

module.exports = router;
