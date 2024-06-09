import { Request, Response } from 'express';

import {
  getAnalyticsByAspect,
  getTotalRequests,
  getWeeklyTrend,
  acceptedAspects
} from '../services/clickhouse/query.js';

class ClickhouseResponseController {
  getAnalytics(req: Request, res: Response): void {
    const { code, aspect, startdate, enddate } = req.query;
    if (!code || !aspect) {
      res.status(400).json({
        message: 'Code and Aspect are required!!',
      });
      return;
    }
    if (!acceptedAspects.includes(aspect)) {
      res.status(400).json({
        message: 'Invalid Aspect!!',
      });
      return;
    }

    getAnalyticsByAspect(code, aspect, startdate, enddate)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((error) => {
        res.status(500).json({
          message: `Error: ${error.message}`,
        });
      });
  }

  getTotal(req: Request, res: Response): void {
    const { code, startdate, enddate } = req.query;
    if (!code) {
      res.status(400).json({
        message: 'Code is required!!',
      });
      return;
    }

    getTotalRequests(code, startdate, enddate)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((error) => {
        res.status(500).json({
          message: `Error: ${error.message}`,
        });
      });
  }

  getWeeklyTrend(req: Request, res: Response): void {
    const { code, startdate, enddate } = req.query;
    if (!code) {
      res.status(400).json({
        message: 'Code is required!!',
      });
      return;
    }

    getWeeklyTrend(code, startdate, enddate)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((error) => {
        res.status(500).json({
          message: `Error: ${error.message}`,
        });
      });
  }
}

export default new ClickhouseResponseController();
