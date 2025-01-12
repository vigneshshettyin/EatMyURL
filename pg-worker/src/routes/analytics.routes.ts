import { Router } from "express";
import {
  getAnalytics,
  getWeeklyVisits,
} from "../controller/analytics.controller";

const router = Router();

router.get("/analytics/:option/:code", getAnalytics);
router.get("/weekly-change/:code", getWeeklyVisits);

export default router;
