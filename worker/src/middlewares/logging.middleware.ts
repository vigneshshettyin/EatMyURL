import { Request, Response, NextFunction } from "express";
import logger from "../utils/logger";

const loggingMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  res.on("finish", () => {
    const responseTime = Date.now() - start;
    logger.info(
      `${req.method} ${req.originalUrl} ${res.statusCode} ${responseTime}ms`
    );
  });
  next();
};

export default loggingMiddleware;
