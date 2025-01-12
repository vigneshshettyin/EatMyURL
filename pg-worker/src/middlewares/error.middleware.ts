import { Request, Response, NextFunction } from "express";

const errorMiddleware = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error("Unexpected error:", err);
  res.status(500).json({
    error: "Internal Server Error",
    message: err.message || "An unknown error occurred",
    details: JSON.stringify(err),
  });
};

export default errorMiddleware;
