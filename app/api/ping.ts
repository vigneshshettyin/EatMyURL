import { NextApiRequest, NextApiResponse } from "next";

module.exports = async (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({ message: "pong" });
};
