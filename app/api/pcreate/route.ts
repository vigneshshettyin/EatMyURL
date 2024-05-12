import { NextRequest } from "next/server";
import validateURLCreateReq from "@/lib/validations/url_create";
import { invokeRedis } from "@/lib/services/rgenerate";

export async function POST(req: NextRequest) {
  const { long_url, status, msg } = await validateURLCreateReq(req);

  if (!status) {
    return Response.json(
      {
        error: "Invalid input",
        moreinfo: msg,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        status: 400,
      }
    );
  }

  try {
    const res = await invokeRedis(long_url);
    return Response.json(
      {
        short_url: `${req.headers.get("host")}/${res}`,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        status: 200,
      }
    );
  } catch (e) {
    return Response.json(
      {
        error: "Internal Server Error",
        moreinfo: JSON.stringify(e),
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        status: 500,
      }
    );
  }
}
