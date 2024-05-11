import RedisClientManager from "./redis_connect";

const redis = RedisClientManager.getInstance().getPublicRedisClient();

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

const getLongUrl = async (shortCode: string): Promise<string | null> => {
  return await redis.get(shortCode);
};

const getRecords = async (short_code_list: string[]): Promise<any> => {
  const records = await redis.mget(short_code_list);
  const recordsKeyValue = short_code_list.map((short_code, index) => {
    return { [short_code]: records[index] };
  });
  return recordsKeyValue.filter((record) => {
    return record[Object.keys(record)[0]] !== null;
  });
};

const checkIfShortCodePublic = (shortCode: string): boolean => {
  return shortCode.startsWith("P-");
};

export { invokeRedis, getLongUrl, getRecords, checkIfShortCodePublic };
