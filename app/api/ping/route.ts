import { NextRequest } from "next/server";

import PrismaClientManager from "@/lib/services/pg_connect";
import RedisClientManager from "@/lib/services/redis_connect";

import getUA from "@/lib/services/ua";
import { RESPONSE, HTTP_STATUS } from "@/lib/constants";



export async function GET(req: NextRequest) {
  const ip =
    req.headers.get("x-real-ip") ||
    req.headers.get("x-forwarded-for") ||
    req.ip;
  
  const userAgent = getUA(req);

  const response_obj = {
    postgres : "OK!",
    redis : "OK!",
    userAgent,
    ip
  }

  const posgresInstance = PrismaClientManager.getInstance()
  const postgres_status = await posgresInstance.checkStatus()

  const redisInstance = RedisClientManager.getInstance()
  const redis_status = await redisInstance.checkStatus()

  if (!postgres_status) {
    response_obj["postgres"] = "ERROR!"
  }

  if (!redis_status) {
    response_obj["redis"] = "ERROR!"
  }

 
  return RESPONSE(response_obj, HTTP_STATUS.OK);
}
