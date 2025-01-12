// routes/healthCheck.routes.ts
import { Router } from "express";
import { healthCheck } from "../controller/health.controller";

const router = Router();

router.get("/", healthCheck);

export default router;
