import { HTTP_STATUS, RESPONSE } from "@/lib/constants";
import {
  checkIfShortCodePublic,
  getLongUrl,
  publishUserAgent,
} from "@/lib/services/redisPublicGenerate";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const shortCode = path.replace("/", "");

  if (!checkIfShortCodePublic(shortCode)) {
    return RESPONSE(
      {
        error: "Invalid input",
        moreinfo: "We are currently not supporting private short codes",
      },
      HTTP_STATUS.BAD_REQUEST
    );
  }

  const long_url = await getLongUrl(shortCode);

  if (!long_url) {
    return RESPONSE(
      {
        error: "Invalid input",
        moreinfo: "Short link generated is invalid or expired",
      },
      HTTP_STATUS.BAD_REQUEST
    );
  }

  await publishUserAgent(req, shortCode);

  return Response.redirect(long_url, 301);
}
