import { NextRequest } from "next/server";

import prisma from "@/lib/services/pgConnect";
import RedisClientManager from "@/lib/services/redisConnect";

import userAgentAnlytics from "@/lib/services/ua";
import { RESPONSE, HTTP_STATUS } from "@/lib/constants";

export async function GET(req: NextRequest) {
  const userAgent = userAgentAnlytics(req);

  const response_obj = {
    infra: {
      postgres: "OK!",
      redis: "OK!",
      clickouse: "ERROR!",
      kafka: "ERROR!",
    },
    user_anlytics: userAgent,
  };

  const checkPg = await prisma.$queryRaw`SELECT 1`;
  const postgresStatus = checkPg === 1;


  const redisInstance = RedisClientManager.getInstance();
  const redisStatus = await redisInstance.checkStatus();

  if (!postgresStatus) {
    response_obj["infra"]["postgres"] = "ERROR!";
  }

  if (!redisStatus) {
    response_obj["infra"]["redis"] = "ERROR!";
  }

  return RESPONSE(response_obj, HTTP_STATUS.OK);
}
