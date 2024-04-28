import { UAParser } from "ua-parser-js";
import { UAParserType, RequiredUA } from "@/interfaces/ua";
import { NextRequest } from "next/server";

const getUA = (req: NextRequest): RequiredUA => {
  const userAgent = req.headers.get("user-agent");
  const parser: any = new UAParser();
  parser.setUA(userAgent);

  const result: UAParserType = parser.getResult();

  return {
    browser: result.browser.name,
    os: result.os.name,
    device: result.device.vendor,
  };
};

export default getUA;
