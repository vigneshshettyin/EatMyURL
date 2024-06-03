import { NextRequest } from "next/server";
import RedisClientManager from "./redisConnect";
import userAgentAnlytics from "@/lib/services/ua";

const redis = RedisClientManager.getInstance().getPublicRedisClient();
const pubSubRedis = RedisClientManager.getInstance().getPubSubRedisClient();

const generateShortCode = (): string => {
  const allowedChars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const shortCodeLength = 6;
  let shortCode = "";
  for (let i = 0; i < shortCodeLength; i++) {
    const randomIndex = Math.floor(Math.random() * allowedChars.length);
    shortCode += allowedChars[randomIndex];
  }
  return `P-${shortCode}`;
};

const invokeRedis = async (long_url: string): Promise<string> => {
  const shortCode = generateShortCode();
  const exists = await redis.exists(shortCode);
  if (exists) {
    return await invokeRedis(long_url);
  }
  await redis.set(shortCode, long_url, "EX", 7200);
  return shortCode;
};

const setPrivateShortCode = async (
  shortCode: string,
  longUrl: string
): Promise<string> => {
  await redis.set(shortCode, longUrl, "EX", 604800);
  return shortCode;
};

const updatePrivateShortCode = async (
  oldShortCode: string,
  newShortCode: string,
  longUrl: string
): Promise<string> => {
  const checkIfUrlExists = await redis.get(oldShortCode);
  if (checkIfUrlExists) {
    await redis.del(oldShortCode);
    return await setPrivateShortCode(newShortCode, longUrl);
  } else {
    return await setPrivateShortCode(newShortCode, longUrl);
  }
};

const getLongUrl = async (shortCode: string): Promise<string | null> => {
  return await redis.get(shortCode);
};

const getRecords = async (short_code_list: string[]): Promise<any> => {
  const records = await redis.mget(short_code_list);
  const recordsKeyValue = short_code_list.map((short_code, index) => {
    return { shortUrl: short_code, longUrl: records[index] };
  });

  return recordsKeyValue.filter((record) => {
    return record.longUrl !== null;
  });
};

const checkIfShortCodePublic = (shortCode: string): boolean => {
  return shortCode.startsWith("P-");
};

const publishUserAgent = async (req: NextRequest, code: string) => {
  const userAgent = userAgentAnlytics(req);

  await pubSubRedis.lpush(
    "user_anlytics",
    JSON.stringify({
      code,
      ...userAgent,
    })
  );
};

export {
  invokeRedis,
  getLongUrl,
  getRecords,
  checkIfShortCodePublic,
  publishUserAgent,
  setPrivateShortCode,
  updatePrivateShortCode
};
