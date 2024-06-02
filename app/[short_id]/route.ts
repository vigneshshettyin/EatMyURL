import { HTTP_STATUS, RESPONSE } from "@/lib/constants";
import {
  checkIfShortCodePublic,
  getLongUrl,
  publishUserAgent,
  setPrivateShortCode,
} from "@/lib/services/redisPublicGenerate";
import { NextRequest } from "next/server";
import PrismaClientManager from "@/lib/services/pgConnect";

export async function GET(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const shortCode = path.replace("/", "");

  const long_url = await getLongUrl(shortCode);

  if (!!long_url) {
    await publishUserAgent(req, shortCode);
    return Response.redirect(long_url, 301);
  }

  if (!long_url && checkIfShortCodePublic(shortCode)) {
    return RESPONSE(
      {
        error: "Invalid input",
        moreinfo: "Short link generated is invalid or expired",
      },
      HTTP_STATUS.BAD_REQUEST
    );
  } else if (!long_url && !checkIfShortCodePublic(shortCode)) {
    const prisma = PrismaClientManager.getInstance().getPrismaClient();
    const link = await prisma.links.findFirst({
      where: {
        short_code: shortCode,
      },
    });

    if (!link) {
      return RESPONSE(
        {
          error: "Invalid input",
          moreinfo: "Short link generated is invalid or expired",
        },
        HTTP_STATUS.BAD_REQUEST
      );
    }
    await setPrivateShortCode(shortCode, link.long_url);
    await publishUserAgent(req, shortCode);
    return Response.redirect(link?.long_url, 301);
  }
}
