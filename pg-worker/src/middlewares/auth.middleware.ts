import dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY || "__test__secret__key__";

const secretKeyAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { apikey } = req.headers;

  if (!apikey || apikey !== SECRET_KEY) {
    res.status(401).json({ error: "Unauthorized" });
    return
  }

  next();
};

export default secretKeyAuth;
