import { Request, Response, NextFunction } from "express";
import {
  fetchAnalyticsByOption,
  lastSevenDaysAnalytics,
} from "../services/analyticsService";

const validOptions = ["browser", "os", "device", "country", "region", "city"];

export const getAnalytics = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { option, code } = req.params;

  try {
    if (!validOptions.includes(option)) {
      res.status(400).json({
        error: `Invalid option provided. Valid options are: ${validOptions.join(
          ", "
        )}`,
      });
      return;
    }

    const analytics = await fetchAnalyticsByOption(option, code);
    res.status(200).json(analytics);
  } catch (error) {
    next(error);
  }
};

export const getWeeklyVisits = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { code } = req.params;

  try {
    const analytics = await lastSevenDaysAnalytics(code);
    res.status(200).json(analytics);
  } catch (error) {
    next(error);
  }
};
