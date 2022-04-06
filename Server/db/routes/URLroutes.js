const URLrouter = require("express").Router();
const URL_SHORTENER = require("../../controller/url");
const multer = require("multer");
const { authenticate } = require("../Middleware/authuser");
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
 * components:
 *   schemas:
 *     CUSTOM_SHORT_URL:
 *       type: object
 *       required:
 *         - url
 *         - shortID
 *       properties:
 *         url:
 *           type: string
 *           description: The long URL to be shortened
 *         shortID:
 *           type: string
 *           description: The short ID corresponding to the long URL
 *       example:
 *         url: https://blog.vigneshcodes.in/quick-guide-to-deploy-using-docker
 *         shortID: 15FTKq
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     SHORT_URL:
 *       type: object
 *       required:
 *         - url
 *       properties:
 *         url:
 *           type: string
 *           description: The long URL to be shortened
 *       example:
 *         url: https://eatmyurl.ml/15FTKs
 */

/**
 * @swagger
 * tags:
 *   name: EatMyURL
 *   description: API Docs
 */

URLrouter.get("/:shortID", URL_SHORTENER.redirect);

/**
 * @swagger
 * /api/new:
 *   post:
 *     summary: To create a short link
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

URLrouter.post("/new/auth", upload.none(), URL_SHORTENER.shorten);

/**
 * @swagger
 * /api/new-custom:
 *   post:
 *     summary: To create a custom short link
 *     tags: [EatMyURL]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CUSTOM_SHORT_URL'
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

URLrouter.post("/api/new-custom", upload.none(), URL_SHORTENER.customShorten);

/**
 * @swagger
 * /api/click:
 *   post:
 *     summary: To get the short link click count
 *     tags: [EatMyURL]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SHORT_URL'
 *     responses:
 *       200:
 *         description: The short link click count has been retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/URL'
 *       500:
 *         description: Some server error
 *
 */

URLrouter.post("/api/click", upload.none(), URL_SHORTENER.getClickCount);

URLrouter.get("/api/stats", URL_SHORTENER.getStats);

module.exports = URLrouter;
