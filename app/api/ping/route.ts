import { NextRequest, NextResponse } from "next/server";

import getPrisma from "@/lib/services/pg_connect";
import getRedis from "@/lib/services/redis_connect";
import getUA from "@/lib/services/ua";

import { PgResponse } from "@/interfaces/connection";

export async function GET(req: NextRequest) {
  const ip =
    req.headers.get("x-real-ip") ||
    req.headers.get("x-forwarded-for") ||
    req.ip;

  const redis = getRedis();
  const pg = getPrisma();

  let redis_result: string = "OK!";
  let pg_result: PgResponse[] = [];

  // Check if Redis is connected
  try {
    await redis.ping();
  } catch (e) {
    redis_result = "ERROR!";
  }

  // Check if Postgres is connected
  try {
    pg_result = await pg.$queryRaw`SELECT 'OK!' as result`;
  } catch (e) {
    pg_result = [{ result: "ERROR!" }];
  }

  // Get user agent
  const userAgent = getUA(req);

  const response: object = {
    userAgent,
    ip,
    redis: redis_result,
    postgres: pg_result[0].result,
  };

  return Response.json(response, {
    headers: {
      "Content-Type": "application/json",
    },
    status: 200,
  });
}
