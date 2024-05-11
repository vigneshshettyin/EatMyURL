import { checkIfShortCodePublic, getLongUrl } from "@/lib/services/rgenerate";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const short_code = path.replace("/", "");

  if (!checkIfShortCodePublic(short_code)) {
    return Response.json(
      {
        error: "Invalid input",
        moreinfo: "We are currently not supporting private short codes",
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        status: 400,
      }
    );
  }

  const long_url = await getLongUrl(short_code);

  if (!long_url) {
    return Response.json(
      {
        error: "Invalid input",
        moreinfo: "Short link generated is invalid or expired",
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        status: 400,
      }
    );
  }

  return Response.redirect(long_url, 301);
}
