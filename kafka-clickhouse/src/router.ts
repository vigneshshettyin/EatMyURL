import express, { Router, Request, Response } from 'express';

import HealthCheckController from './controller/healthcheck.js';
import ClickhouseResponseController from './controller/clickhouse.js';

const router: Router = express.Router();

router.get('/', (_req: Request, res: Response) => {
  res.status(200).json({
    message: 'Hello, World!',
  });
});

router.get('/health', HealthCheckController.healthCheckHandler);

router.get('/analytics', ClickhouseResponseController.getAnalytics);

router.get('/total', ClickhouseResponseController.getTotal);

router.get('/weekly', ClickhouseResponseController.getWeeklyTrend);

export default router;
