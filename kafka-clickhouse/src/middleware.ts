import { Request, Response, NextFunction } from 'express';

const SECRET_KEY = process.env.SECRET_KEY || '__test__secret__key__';

export const secretKeyValidator = (
  req: Request,
  res: Response,
  next: NextFunction,
): NextFunction => {
  const { apikey } = req.headers;

  if (!apikey || apikey !== SECRET_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  next();
};
