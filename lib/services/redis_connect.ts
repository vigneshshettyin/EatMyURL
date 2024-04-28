import Redis from "ioredis";
const redisUri: any = process.env.REDIS_URL;

let redis: Redis;

const getRedis = (): Redis => {
  if (!redis) {
    redis = new Redis(redisUri);
  }
  return redis;
};

export default getRedis;
