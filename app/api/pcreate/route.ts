import { NextRequest } from "next/server";
import validateURLCreateReq from "@/lib/validations/url_create";
import { HTTP_STATUS, RESPONSE } from "@/lib/constants";
import { invokeRedis } from "@/lib/services/redisPublicGenerate";

export async function POST(req: NextRequest) {
  const { long_url, status, msg } = await validateURLCreateReq(req);

  if (!status) {
    return RESPONSE(
      {
        error: "Invalid input",
        more_info: msg,
      },
      HTTP_STATUS.BAD_REQUEST
    );
  }

  try {
    const res = await invokeRedis(long_url);
    return RESPONSE(
      {
        short_url: `${req.headers.get("host")}/${res}`,
      },
      HTTP_STATUS.CREATED
    );
  } catch (e) {
    return RESPONSE(
      {
        error: "Internal Server Error",
        more_info: JSON.stringify(e),
      },
      HTTP_STATUS.INTERNAL_SERVER_ERROR
    );
  }
}
