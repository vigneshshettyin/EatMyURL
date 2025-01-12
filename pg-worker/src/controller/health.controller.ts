import { Request, Response } from "express";
import { performHealthCheck } from "../services/healthCheckService";

export const healthCheck = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const healthStatus = await performHealthCheck();
    res.status(200).json(healthStatus);
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Health check failed",
    });
  }
};
