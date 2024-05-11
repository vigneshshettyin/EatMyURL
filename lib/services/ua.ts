import { UAParser } from "ua-parser-js";

import { NextRequest } from "next/server";
import { IUAParser, IRequiredUA } from "@/interfaces/ua";

const userAgentAnlytics = (req: NextRequest): IRequiredUA => {
  const userAgent = req.headers.get("user-agent");
  const ip =
    req.headers.get("x-real-ip") ||
    req.headers.get("x-forwarded-for") ||
    req.ip;

  const parser: any = new UAParser();
  parser.setUA(userAgent);

  const result: IUAParser = parser.getResult();

  return {
    ip: ip as string,
    browser: result.browser.name,
    os: result.os.name,
    device: result.device.vendor,
  };
};

export default userAgentAnlytics;
